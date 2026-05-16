"use client";

import { useEffect, useMemo, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Puzzle, Search } from "lucide-react";
import { getIntegrations, type DemoIntegration } from "@/mock/integrations";

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<DemoIntegration[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | DemoIntegration["category"]
  >("All");

  useEffect(() => {
    void (async () => {
      const data = await getIntegrations();
      setIntegrations(data);
    })();
  }, []);

  const filteredIntegrations = useMemo(() => {
    const term = search.trim().toLowerCase();
    return integrations.filter((integration) => {
      const matchesCategory =
        selectedCategory === "All" ||
        integration.category === selectedCategory;
      const matchesSearch =
        term.length === 0 ||
        integration.name.toLowerCase().includes(term) ||
        integration.category.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

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
              <Puzzle className="size-5 text-[#4f46e5]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Integrations
              </h1>
              <p className="text-sm text-slate-500">
                Connect external tools to enrich the ISR Co-Pilot experience.
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            6 connected
          </Badge>
        </header>

        <main className="flex-1 min-h-0 overflow-auto bg-slate-50 px-6 py-5 space-y-5">
          <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                className="h-9 w-full rounded-full border border-slate-200 bg-white px-9 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
                placeholder="Search integrations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="inline-flex flex-wrap gap-2 text-xs">
              {(
                ["All", "Communication", "CRM", "Voice", "Helpdesk", "Analytics"] as const
              ).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(cat as "All" | DemoIntegration["category"])
                  }
                  className={`px-3 py-1 rounded-full border text-xs transition-all duration-150 ${
                    selectedCategory === cat
                      ? "bg-[#6366f1] border-[#6366f1] text-white shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:border-[#6366f1]/40 hover:text-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {filteredIntegrations.map((integration) => (
              <Card key={integration.name} className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-sm">
                    <span>{integration.name}</span>
                    <Badge
                      variant={
                        integration.status === "Connected"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-[11px]"
                    >
                      {integration.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{integration.category}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between text-xs text-slate-500">
                  <span>
                    Use for richer context in{" "}
                    <span className="font-medium text-slate-700">
                      calls
                    </span>
                    .
                  </span>
                  <Button
                    size="sm"
                    variant={
                      integration.status === "Connected" ? "outline" : "default"
                    }
                  >
                    {integration.status === "Connected" ? "Settings" : "Connect"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

