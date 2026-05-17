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
import { Activity, BarChart3, LineChart, Sparkles } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CallRecord } from "@/types/call-records";
import {
  demoAnalyticsSnapshot,
  demoChannelStats,
  demoSlaBreakdown,
  dashboardAgentSnapshots,
} from "@/mock/app-demo-data";
import { format } from "date-fns";
import {
  AGENT_CO_PILOTS,
  agentPerformanceFromBuckets,
  aiResolutionRate,
  averageDurationMinutes,
  averageSentimentScore,
  bucketByChannel,
  buildWeeklyVolumeSeries,
  fetchCallHistory,
  filterRecordsInWindow,
  maxVolumeCount,
  type ChannelLabel,
} from "@/lib/call-analytics";

type TimeRange = "24h" | "7d" | "30d" | "90d";

const WINDOW_DAYS: Record<TimeRange, number> = {
  "24h": 1,
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

function demoVolumeSeries() {
  return demoAnalyticsSnapshot.volume.map((point) => ({
    day: new Date(point.date),
    count: point.total,
    resolvedCount: point.resolved,
    followUpCount: point.followUp,
    otherCount: point.other,
  }));
}

function demoAgentPerformance() {
  return dashboardAgentSnapshots.map((agent, index) => ({
    name: agent.name,
    value: agent.value,
    tone: AGENT_CO_PILOTS[index]?.tone ?? "bg-indigo-500",
  }));
}

export default function AnalyticsPage() {
  const [records, setRecords] = useState<CallRecord[]>([]);
  const [range, setRange] = useState<TimeRange>("7d");

  useEffect(() => {
    void fetchCallHistory().then(setRecords);
  }, []);

  const {
    totalConversations,
    aiResolutionRate,
    avgHandleMinutes,
    sentimentScore,
    volumeSeries,
    volumeMax,
    agentPerformance,
    slaBreakdown,
    channelStats,
  } = useMemo(() => {
    const filtered = filterRecordsInWindow(
      records,
      WINDOW_DAYS[range] ?? 7
    );

    if (filtered.length === 0) {
      const volume = demoVolumeSeries();
      return {
        totalConversations: demoAnalyticsSnapshot.totalConversations,
        aiResolutionRate: demoAnalyticsSnapshot.aiResolutionRate,
        avgHandleMinutes: demoAnalyticsSnapshot.avgHandleMinutes,
        sentimentScore: demoAnalyticsSnapshot.sentimentScore,
        volumeSeries: volume,
        volumeMax: maxVolumeCount(volume),
        agentPerformance: demoAgentPerformance(),
        slaBreakdown: demoSlaBreakdown,
        channelStats: demoChannelStats,
      };
    }

    const total = filtered.length;
    const buckets = bucketByChannel(filtered);
    const series = buildWeeklyVolumeSeries(filtered);

    const withinSla = Math.min(97, Math.max(60, aiResolutionRate(filtered) + 10));
    const atRisk = Math.max(3, 100 - withinSla - 4);
    const breached = 100 - withinSla - atRisk;

    const channelStats = (Object.entries(buckets) as [ChannelLabel, CallRecord[]][]).map(
      ([label, items]) => {
        if (items.length === 0) {
          const baseline = demoChannelStats.find((c) => c.label === label);
          if (baseline) return baseline;
        }
        return {
          label,
          total: items.length,
          aiResolution: aiResolutionRate(items),
          avgMinutes: averageDurationMinutes(items),
          sentiment: averageSentimentScore(items),
        };
      }
    );

    return {
      totalConversations: total,
      aiResolutionRate: aiResolutionRate(filtered),
      avgHandleMinutes: averageDurationMinutes(filtered),
      sentimentScore: averageSentimentScore(filtered),
      volumeSeries: series,
      volumeMax: maxVolumeCount(series),
      agentPerformance: agentPerformanceFromBuckets(buckets, total),
      slaBreakdown: { within: withinSla, atRisk, breached },
      channelStats,
    };
  }, [records, range]);

  const formattedAvgHandle =
    avgHandleMinutes <= 0 ? "—" : `${avgHandleMinutes.toFixed(1)} min`;
  const satisfactionDisplay =
    sentimentScore <= 0 ? "—" : sentimentScore.toFixed(1);

  return (
    <motion.div
      className="h-screen w-screen p-4 flex gap-4 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.7),_transparent_55%),linear-gradient(to_br,_#f5f3ff,_#e0f2fe)]"
      suppressHydrationWarning
    >
      <AppSidebar />

      <motion.div className="flex-1 min-w-0 h-full rounded-3xl bg-white/95 border border-white/80 shadow-[0_26px_60px_rgba(148,163,184,0.45)] backdrop-blur-2xl overflow-hidden flex flex-col">