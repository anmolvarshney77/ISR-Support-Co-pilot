import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  transcript: string;
  sessionId: string;
  customerName?: string;
  customerAccount?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const transcript =
      typeof body.transcript === "string" ? body.transcript.trim() : "";
    const sessionId =
      typeof body.sessionId === "string" ? body.sessionId.trim() : "";

    if (!transcript || !sessionId) {
      return NextResponse.json(
        { error: "transcript and sessionId are required" },
        { status: 400 }
      );
    }

    const { generateCallSummary } = await import("@/lib/ur-agents");
    const record = await generateCallSummary(
      transcript,
      sessionId,
      body.customerName,
      body.customerAccount
    );

    return NextResponse.json({ record });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
