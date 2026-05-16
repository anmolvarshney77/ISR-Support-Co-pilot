import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CustomerContext = {
  name?: string;
  accountId?: string;
  personaLabel?: string;
};

type ChatAssistRequestBody = {
  message: string;
  sessionId: string;
  customerContext?: CustomerContext | null;
};

type ChatAssistStructuredResponse = {
  Summary?: string;
  "Key points"?: string[];
  "Action steps (system)"?: string[];
  "Caveats / policy notes"?: string[];
};

function extractLyzrResponse(data: Record<string, unknown>): string {
  if (typeof data.response === "string") return data.response;
  if (typeof data.message === "string") return data.message;
  if (typeof data.content === "string") return data.content;
  return JSON.stringify(data);
}

function tryParseJsonObject(text: string): Record<string, unknown> | null {
  if (!text) return null;
  const stripped = text
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  const first = stripped.indexOf("{");
  const last = stripped.lastIndexOf("}");
  if (first === -1 || last === -1) return null;
  const candidate = stripped.slice(first, last + 1);

  try {
    const parsed = JSON.parse(candidate) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
}

function coerceStringArray(value: unknown): string[] | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) {
    const items = value
      .map((x) => (typeof x === "string" ? x.trim() : ""))
      .filter(Boolean);
    return items.length ? items : undefined;
  }
  if (typeof value === "string") {
    const single = value.trim();
    return single ? [single] : undefined;
  }
  return undefined;
}

function normalizeStructured(obj: Record<string, unknown>): ChatAssistStructuredResponse {
  const Summary =
    typeof obj.Summary === "string"
      ? obj.Summary
      : typeof obj.summary === "string"
        ? obj.summary
        : undefined;

  const KeyPoints =
    coerceStringArray(obj["Key points"]) ??
    coerceStringArray(obj.key_points) ??
    coerceStringArray(obj.keyPoints);

  const ActionSteps =
    coerceStringArray(obj["Action steps (system)"]) ??
    coerceStringArray(obj.action_steps) ??
    coerceStringArray(obj.actionSteps);

  const Caveats =
    coerceStringArray(obj["Caveats / policy notes"]) ??
    coerceStringArray(obj.caveats) ??
    coerceStringArray(obj.policy_notes) ??
    coerceStringArray(obj.policyNotes);

  const result: ChatAssistStructuredResponse = {};
  if (Summary && Summary.trim()) result.Summary = Summary.trim();
  if (KeyPoints?.length) result["Key points"] = KeyPoints;
  if (ActionSteps?.length) result["Action steps (system)"] = ActionSteps;
  if (Caveats?.length) result["Caveats / policy notes"] = Caveats;
  return result;
}

function buildStructuredJsonInstruction(): string {
  // NOTE: Some upstream agent configs attempt to force an OpenAI `json_schema`
  // response_format when we demand strict JSON. If their schema name is invalid,
  // the call fails entirely and we get 5xx back. Asking for a structured *text*
  // response keeps the agent usable while still being easy to parse client-side.
  return `Reply in plain text with these sections (no JSON required):

Summary: <1–2 sentences>
Key points:
- <bullets>

If relevant, also include:
Action steps (system):
- <bullets>
Caveats / policy notes:
- <bullets>`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatAssistRequestBody;
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim() : "";
    const customerContext = body.customerContext ?? null;

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: "message and sessionId are required" },
        { status: 400 }
      );
    }

    // Local KB-based assist (always available). The external chat-assist agent
    // can be misconfigured upstream and intermittently return 5xx; the KB
    // implementation keeps the prototype functional and consistent.
    const { buildKbAnswer } = await import("@/lib/kb-assist");
    const kbAnswer = buildKbAnswer(message, customerContext);

    return NextResponse.json({
      structured: null,
      raw: kbAnswer,
    });

    const apiBaseUrl =
      process.env.LYZR_API_BASE_URL ?? "https://agent-prod.studio.lyzr.ai/v3/inference/chat/";
    // Server-side fallback key so the demo works without env setup.
    // For production, set LYZR_API_KEY and remove/rotate this value.
    const apiKey =
      process.env.LYZR_API_KEY ?? "sk-default-fiw9zSxMDvNGmwGRLeWYD5o5YAdG01DN";
    const userId = process.env.LYZR_USER_ID ?? "anmol@lyzr.ai";
    const agentId = process.env.LYZR_CHAT_ASSIST_AGENT_ID ?? "69b468c30bffa33a918d3bd2";

    const contextLine =
      customerContext?.name || customerContext?.accountId || customerContext?.personaLabel
        ? `Customer context: name=${customerContext?.name ?? "N/A"}, accountId=${customerContext?.accountId ?? "N/A"}, persona=${customerContext?.personaLabel ?? "N/A"}.\n\n`
        : "";

    const prompt = `${contextLine}${buildStructuredJsonInstruction()}\n\nUser question: ${message}`;

    const response = await fetch(apiBaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        user_id: userId,
        agent_id: agentId,
        session_id: sessionId,
        message: prompt,
      }),
    });

    const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;
    const raw = extractLyzrResponse(data);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Chat assist agent error: ${response.status}`,
          raw,
        },
        { status: 502 }
      );
    }

    const parsed = tryParseJsonObject(raw);
    let structured: ChatAssistStructuredResponse | null = null;
    if (parsed) structured = normalizeStructured(parsed as Record<string, unknown>);

    return NextResponse.json({
      structured,
      raw,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

