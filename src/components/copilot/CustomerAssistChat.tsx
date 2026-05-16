"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CUSTOMER_ASSIST_QUICK_ACTIONS } from "@/constants/quick-actions";
import type { CustomerContext } from "@/lib/kb-assist";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

type ChatAssistStructuredResponse = {
  Summary?: string;
  "Key points"?: string[];
  "Action steps (system)"?: string[];
  "Caveats / policy notes"?: string[];
};

type ChatAssistApiResponse = {
  structured: ChatAssistStructuredResponse | null;
  raw: string;
  error?: string;
};

function generateSessionId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderKbMarkdownToHtml(markdown: string): string {
  // Minimal markdown-ish renderer for the KB assist responses.
  // - Escapes HTML first for safety
  // - Supports **bold**, blank-line paragraph breaks, and simple bullet lists (• or -)
  const escaped = escapeHtml(markdown || "").trim();
  if (!escaped) return "I couldn't generate an answer right now.";

  const withBold = escaped.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  const lines = withBold.split(/\r?\n/);

  const out: string[] = [];
  let listItems: string[] = [];
  const flushList = () => {
    if (!listItems.length) return;
    out.push(`<ul>${listItems.map((li) => `<li>${li}</li>`).join("")}</ul>`);
    listItems = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      out.push("<div class=\"h-2\"></div>");
      continue;
    }

    const bulletMatch = line.match(/^(?:•|-)\s+(.*)$/);
    if (bulletMatch) {
      listItems.push(bulletMatch[1]);
      continue;
    }

    flushList();
    out.push(`<div>${line}</div>`);
  }
  flushList();

  return out.join("\n");
}

function renderStructuredToHtml(
  structured: ChatAssistStructuredResponse | null,
  raw: string
): string {
  if (!structured) {
    return renderKbMarkdownToHtml(raw);
  }

  const parts: string[] = [];
  const pushSection = (title: string, bodyHtml: string) => {
    if (!bodyHtml) return;
    parts.push(`<div><strong>${escapeHtml(title)}</strong></div>`);
    parts.push(bodyHtml);
  };

  const summary = structured.Summary?.trim();
  if (summary) {
    pushSection("Summary", `<div>${escapeHtml(summary)}</div>`);
  }

  const keyPoints = structured["Key points"]?.filter(Boolean) ?? [];
  if (keyPoints.length) {
    pushSection(
      "Key points",
      `<ul>${keyPoints
        .map((x) => `<li>${escapeHtml(String(x))}</li>`)
        .join("")}</ul>`
    );
  }

  // Intentionally hidden in the chatbox UI:
  // - "Action steps (system)"
  // - "Caveats / policy notes"
  // We still fetch them (for potential future UI use), but we don't display them here.

  if (parts.length === 0) {
    return escapeHtml(raw || "I couldn't generate a structured answer right now.");
  }

  return parts.join("\n");
}

export function CustomerAssistChat({
  customerContext,
  showCustomerContextHint = false,
}: {
  customerContext?: CustomerContext | null;
  /** When true, show the personalized hint (e.g. "Sarah Lopez's active rentals") in the empty state. Set to true only after a customer message has been displayed in the call. */
  showCustomerContextHint?: boolean;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [nextId, setNextId] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const showQuickQuestions = messages.length === 0;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = "ur_chat_assist_session_id";
    const existing = window.sessionStorage.getItem(key);
    if (existing) {
      setSessionId(existing);
      return;
    }
    const created = generateSessionId("chatassist");
    window.sessionStorage.setItem(key, created);
    setSessionId(created);
  }, []);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;
    let sid = sessionId;
    if (!sid && typeof window !== "undefined") {
      const key = "ur_chat_assist_session_id";
      sid = window.sessionStorage.getItem(key) || "";
      if (!sid) {
        sid = generateSessionId("chatassist");
        window.sessionStorage.setItem(key, sid);
      }
      setSessionId(sid);
    }
    const userMessage: ChatMessage = {
      id: nextId,
      role: "user",
      text: trimmed,
    };
    const assistantPlaceholder: ChatMessage = {
      id: nextId + 1,
      role: "assistant",
      text: "Thinking…",
    };
    setNextId(nextId + 2);
    setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
    setInput("");

    setIsSending(true);
    try {
      const res = await fetch("/api/chat-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          sessionId: sid || generateSessionId("chatassist"),
          customerContext: customerContext ?? null,
        }),
      });
      const data = (await res.json()) as ChatAssistApiResponse;
      const raw = typeof data?.raw === "string" ? data.raw : "";
      const html = renderStructuredToHtml(data?.structured ?? null, raw);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantPlaceholder.id
            ? { ...m, text: html }
            : m
        )
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantPlaceholder.id
            ? {
                ...m,
                text: escapeHtml(
                  `Sorry — I couldn't reach the assistant right now. ${msg ? `(${msg})` : ""}`
                ),
              }
            : m
        )
      );
    } finally {
      setIsSending(false);
    }
  };

  const quickAsk = (text: string) => {
    void send(text);
  };

  return (
    <section className="flex flex-col h-full min-h-0 bg-gradient-to-b from-slate-50/80 via-white to-white">
      {/* Chat history — responses visible here, just above the chat box */}
      <div className="flex-1 min-h-[160px] px-4 py-3 overflow-y-auto space-y-2.5 text-xs">
        {messages.length === 0 && (
          <p className="pt-6 text-center text-slate-400 text-[11px] leading-relaxed">
            {customerContext?.name && showCustomerContextHint
              ? `Ask about rates, off-rent, delivery, RPP, or "${customerContext.name}"'s active rentals.`
              : "Pick a quick question above or type your own in the box below."}
          </p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 ${
                m.role === "user"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-slate-800 border border-slate-200/80 shadow-sm"
              } ${m.role === "assistant" ? "" : "whitespace-pre-wrap"}`}
            >
              {m.role === "assistant" ? (
                <span
                  className="text-[11px] leading-relaxed [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:my-1"
                  dangerouslySetInnerHTML={{
                    __html: m.text,
                  }}
                />
              ) : (
                <span className="text-[11px] leading-relaxed">
                  {m.text}
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Quick questions (hidden once chat is initiated) */}
      {showQuickQuestions && (
        <div className="shrink-0 px-4 pb-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mb-2.5">
            Quick questions
          </p>
          <div className="flex flex-wrap gap-2">
            {CUSTOMER_ASSIST_QUICK_ACTIONS.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => quickAsk(label)}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[11px] font-medium text-slate-600 shadow-sm hover:border-indigo-200 hover:bg-indigo-50/70 hover:text-indigo-800 active:scale-[0.98] transition-all duration-200"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat box — answer appears just above this */}
      <form
        className="shrink-0 px-4 pb-4 pt-3 border-t border-slate-200/60 bg-white/95 flex items-center gap-2.5"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the assistant..."
          disabled={isSending}
          className="h-10 flex-1 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-200/60 focus-visible:border-indigo-300 focus-visible:bg-white transition-all"
        />
        <Button
          type="submit"
          size="icon"
          disabled={isSending}
          className="h-10 w-10 shrink-0 rounded-xl bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-indigo-300 transition-all duration-200"
        >
          {isSending ? (
            <div className="size-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
        </Button>
      </form>
    </section>
  );
}
