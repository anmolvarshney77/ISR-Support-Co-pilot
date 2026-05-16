import * as React from "react";

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
};

export function Tooltip({ content, children, side = "top" }: TooltipProps) {
  const positionClass =
    side === "right"
      ? "left-full top-1/2 -translate-y-1/2 ml-2"
      : side === "left"
        ? "right-full top-1/2 -translate-y-1/2 mr-2"
        : side === "bottom"
          ? "left-0 top-full mt-1"
          : "left-0 bottom-full mb-1";
  return (
    <span className="relative inline-flex group">
      {children}
      <span
        className={`pointer-events-none absolute z-20 hidden whitespace-normal rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-900 shadow-sm border border-slate-200 group-hover:block max-w-sm w-64 text-left leading-snug ${positionClass}`}
      >
        {content}
      </span>
    </span>
  );
}

