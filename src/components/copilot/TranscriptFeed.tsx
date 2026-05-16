"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { TranscriptEntry } from "@/types/call-records";

interface TranscriptFeedProps {
  entries: TranscriptEntry[];
  isActive: boolean;
  // Optional props kept for backwards compatibility; currently ignored.
  isCollapsed?: boolean;
  onToggleCollapsed?: () => void;
}

export function TranscriptFeed({
  entries,
  isActive,
  onToggleCollapsed,
}: TranscriptFeedProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  const isEmpty = entries.length === 0;

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {/* Header */}
      <div className="shrink-0 h-11 px-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {onToggleCollapsed && (
            <button
              type="button"
              onClick={onToggleCollapsed}
              className="size-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-200"
              aria-label="Collapse transcript panel"
            >
              <ChevronLeft className="size-3.5" />
            </button>
          )}
          <h3 className="text-[15px] font-bold text-slate-900 tracking-tight truncate">
            Live Transcript
          </h3>
        </div>
        {isActive && (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-indigo-800 bg-indigo-50 border border-indigo-200/90 px-2 py-0.5 rounded-full">
            <span className="size-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Recording
          </span>
        )}
      </div>

      {/* Body */}
      {isEmpty ? (
        <div className="flex-1 flex items-center justify-center bg-slate-50/50">
          <p className="text-sm text-slate-500 text-center px-6">
            {isActive
              ? "Listening... transcript will appear here."
              : "Start a call to see the live transcript."}
          </p>
        </div>
      ) : (
        <ScrollArea className="flex-1 min-h-0 bg-slate-50/40">
          <div className="px-4 py-3 space-y-2.5">
            {entries.map((entry, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-xl px-3 py-2.5 border shadow-sm",
                  entry.speaker === "customer"
                    ? "bg-slate-50/95 border-slate-200"
                    : "bg-indigo-50/95 border-indigo-200/90"
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span
                    className={cn(
                      "text-[12px] font-bold tracking-tight",
                      entry.speaker === "customer"
                        ? "text-slate-800"
                        : "text-indigo-900"
                    )}
                  >
                    {entry.speaker === "customer"
                      ? "Customer"
                      : "Agent (ISR)"}
                  </span>
                  <span className="text-[10px] text-slate-400 tabular-nums shrink-0">
                    {entry.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-slate-800 break-words whitespace-pre-wrap">
                  {entry.text}
                </p>
              </div>
            ))}

            {isActive && (
              <div className="flex items-center gap-2 px-3 py-2">
                <span className="size-1.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-xs text-slate-500">Listening...</span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
