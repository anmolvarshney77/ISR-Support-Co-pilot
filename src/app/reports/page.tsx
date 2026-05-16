"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addReport, getReports, type DemoReport } from "@/mock/reports";
import {
  reportTemplates,
  type DemoReportTemplate,
} from "@/mock/app-demo-data";

export default function ReportsPage() {
  const [reports, setReports] = useState<DemoReport[]>([]);
  const [filter, setFilter] = useState<"all" | "daily" | "weekly" | "monthly">(
    "all"
  );

  useEffect(() => {
    void (async () => {
      const data = await getReports();
      setReports(data);
    })();
  }, []);

  const handleGenerate = (template: DemoReportTemplate) => {
    void (async () => {
      const updated = await addReport(template);
      setReports(updated);
    })();
  };

  const filteredReports = reports.filter((r) => {
    if (filter === "all") return true;
    if (filter === "daily") return r.cadence === "Daily";
    if (filter === "weekly") return r.cadence === "Weekly";
    if (filter === "monthly") return r.cadence === "Monthly";
    return true;
  });

  return (
    <div
      className="h-screen w-screen p-4 flex gap-4 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.7),_transparent_55%),linear-gradient(to_br,_#f5f3ff,_#e0f2fe)]"
      suppressHydrationWarning
    >
      <AppSidebar />

      <div className="flex-1 min-w-0 h-full rounded-3xl bg-white/95 border border-white/80 shadow-[0_26px_60px_rgba(148,163,184,0.45)] backdrop-blur-2xl overflow-hidden flex flex-col">
        <header className="shrink-0 h-20 px-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-white via-[#f5f3ff] to-[#eef2ff] backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#eef2ff] flex items-center justify-center shadow-md shadow-indigo-100">
              <FileText className="size-5 text-[#4f46e5]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Reports</h1>
              <p className="text-sm text-slate-500">
                Generate and download summary reports for your ISR Co-Pilot
                calls.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            className="gap-2 rounded-full bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-sm"
          >
            <Plus className="size-4" />
            Custom Report
          </Button>
        </header>

        <main className="flex-1 min-h-0 overflow-auto bg-slate-50 px-6 py-5 space-y-5">
          <section className="grid gap-4 md:grid-cols-3">
            {reportTemplates.map((tpl) => (
              <Card key={tpl.name} className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-sm">
                    <span>{tpl.name}</span>
                    <Badge
                      variant="secondary"
                      className="text-[11px] bg-[#eef2ff] text-[#4f46e5] border border-[#e0e7ff]"
                    >
                      Template
                    </Badge>
                  </CardTitle>
                  <CardDescription>{tpl.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between text-xs text-slate-500">
                  <span>
                    {tpl.cadence} &middot; {tpl.format}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#6366f1] text-[#4f46e5] hover:bg-[#eef2ff]"
                    onClick={() => handleGenerate(tpl)}
                  >
                    Generate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </section>

          <section>
            <Card className="shadow-sm">
              <CardHeader className="flex-row items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-sm">
                    Recent reports (local only)
                  </CardTitle>
                  <CardDescription>
                    Generated in this browser and stored in localStorage for
                    this prototype session.
                  </CardDescription>
                </div>
                <div className="inline-flex items-center gap-2 text-xs">
                  <span className="text-slate-500">Filter:</span>
                  <div className="inline-flex rounded-full bg-[#eef2ff] p-1">
                    {[
                      { id: "all", label: "All" },
                      { id: "daily", label: "Daily" },
                      { id: "weekly", label: "Weekly" },
                      { id: "monthly", label: "Monthly" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setFilter(opt.id as
                            | "all"
                            | "daily"
                            | "weekly"
                            | "monthly")
                        }
                        className={`px-3 py-0.5 rounded-full ${
                          filter === opt.id
                            ? "bg-white text-[#4f46e5] shadow-sm"
                            : "text-slate-500"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-slate-200 overflow-hidden text-sm">
                  <div className="grid grid-cols-[2fr,1fr,1fr,1fr] bg-slate-50/80 px-4 py-2 text-[11px] font-medium text-slate-500">
                    <span>Report name</span>
                    <span>Status</span>
                    <span>Generated</span>
                    <span>Actions</span>
                  </div>
                  {filteredReports.length === 0 ? (
                    <div className="px-4 py-6 text-center text-[13px] text-slate-500">
                      No reports yet. Generate one above to see it here.
                    </div>
                  ) : (
                    filteredReports.map((row) => (
                      <div
                        key={row.id}
                        className="grid grid-cols-[2fr,1fr,1fr,1fr] items-center px-4 py-2 border-t border-slate-100 text-[13px] text-slate-700"
                      >
                        <span className="truncate">{row.name}</span>
                        <span className="text-[#16a34a] text-xs font-medium">
                          {row.status}
                        </span>
                        <span className="text-xs text-slate-500">
                          {row.generatedAt}
                        </span>
                        <span className="text-xs text-[#4f46e5] font-medium">
                          Download
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}

