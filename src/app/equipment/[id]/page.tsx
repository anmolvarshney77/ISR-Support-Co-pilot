"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Package } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import {
  getEquipmentCatalogEntryById,
  searchEquipmentCatalog,
} from "@/mock/equipment-and-rentals";
import { cn } from "@/lib/utils";

function normalizeId(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value) && typeof value[0] === "string") return value[0].trim();
  return "";
}

function prettyIdFallback(id: string): string {
  return decodeURIComponent(id || "")
    .replace(/^custom-/, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

export default function EquipmentDetailPage() {
  const params = useParams();
  const id = normalizeId((params as any)?.id);

  const { entry, fallbackLabel } = useMemo(() => {
    const decoded = decodeURIComponent(id || "");
    const fromId = getEquipmentCatalogEntryById(decoded);
    if (fromId) return { entry: fromId, fallbackLabel: "" };

    // If it's a synthetic "custom-*" id, attempt to recover a label and
    // map it to the closest catalog entry (best-effort).
    const label = prettyIdFallback(decoded);
    const hit = label ? searchEquipmentCatalog(label)[0] : undefined;
    return { entry: hit ?? null, fallbackLabel: label };
  }, [id]);

  const title = (entry?.name ?? fallbackLabel) || "Equipment";
  const description = entry?.description;

  return (
    <div
      className="h-screen w-screen p-4 flex gap-4 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.7),_transparent_55%),linear-gradient(to_br,_#f5f3ff,_#e0f2fe)]"
      suppressHydrationWarning
    >
      <AppSidebar />

      <div className="flex-1 min-w-0 h-full rounded-3xl bg-white/95 border border-white/80 shadow-[0_26px_60px_rgba(148,163,184,0.45)] backdrop-blur-2xl overflow-hidden flex flex-col">
        <header className="shrink-0 h-20 px-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-white via-[#f5f3ff] to-[#eef2ff] backdrop-blur">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/copilot"
              className="inline-flex items-center justify-center size-10 rounded-xl bg-[#eef2ff] shadow-md shadow-indigo-100 text-indigo-600 hover:text-indigo-800"
              aria-label="Back to call"
            >
              <ChevronLeft className="size-5" />
            </Link>
            <div className="min-w-0">
              <h1 className="text-xl font-semibold text-slate-900 truncate">
                {title}
              </h1>
              <p className="text-sm text-slate-500 truncate">
                Equipment details (prototype)
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-auto bg-slate-50 px-6 py-6">
          <div className="max-w-3xl">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2">
                <Package className="size-4 text-indigo-600" strokeWidth={2.25} />
                <p className="text-sm font-semibold text-slate-900">
                  Overview
                </p>
              </div>

              <div className="p-5 space-y-4">
                {description ? (
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {description}
                  </p>
                ) : (
                  <p className="text-sm text-slate-600 leading-relaxed">
                    This equipment was mentioned in the conversation. A detailed
                    catalog entry isn’t available in this prototype yet.
                  </p>
                )}

                {entry ? (
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                      <dt className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                        Category
                      </dt>
                      <dd className="text-slate-800 mt-1">
                        {entry.categoryLabel}
                      </dd>
                    </div>
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                      <dt className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                        Operator certification
                      </dt>
                      <dd
                        className={cn(
                          "text-slate-800 mt-1",
                          entry.operator_cert_required ? "font-semibold" : ""
                        )}
                      >
                        {entry.operator_cert_required ? "Required" : "Not required"}
                      </dd>
                    </div>
                  </dl>
                ) : null}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

