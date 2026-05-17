import type { CallRecord } from "@/types/call-records";
import { isSameDay, subDays } from "date-fns";

export type ChannelLabel = "Voice" | "Billing" | "Troubleshooting";

export type VolumePoint = {
  day: Date;
  count: number;
  resolvedCount: number;
  followUpCount: number;
  otherCount: number;
};

export const SENTIMENT_SCORES: Record<string, number> = {
  satisfied: 5,
  neutral: 3,
  concerned: 2,
  frustrated: 1,
  angry: 1,
  at_risk: 1,
};

export const AGENT_CO_PILOTS: {
  name: string;
  tone: string;
  channel: ChannelLabel;
}[] = [
  { name: "ISR Voice Support Co-Pilot", tone: "bg-indigo-500", channel: "Voice" },
  { name: "Billing Assist Co-Pilot", tone: "bg-sky-400", channel: "Billing" },
  { name: "Troubleshooting Co-Pilot", tone: "bg-violet-400", channel: "Troubleshooting" },
];

export function parseDurationMinutes(estimate?: string): number | null {
  if (!estimate) return null;
  const match = estimate.match(/([\d.]+)/);
  if (!match) return null;
  const num = Number.parseFloat(match[1]);
  return Number.isFinite(num) ? num : null;
}

export function getRecordCallDate(record: CallRecord): Date | null {
  const raw = record.call_summary?.call_date ?? record.call_date;
  if (!raw) return null;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export async function fetchCallHistory(): Promise<CallRecord[]> {
  try {
    const res = await fetch("/api/call-history");
    if (!res.ok) return [];
    const data = (await res.json()) as unknown;
    return Array.isArray(data) ? (data as CallRecord[]) : [];
  } catch {
    return [];
  }
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(1));
}

export function averageDurationMinutes(records: CallRecord[]): number {
  const durations = records
    .map((r) => parseDurationMinutes(r.call_summary?.call_duration_estimate))
    .filter((m): m is number => m != null);
  return average(durations);
}

export function averageSentimentScore(records: CallRecord[]): number {
  const scores = records
    .map((r) => r.customer_health?.sentiment)
    .filter((s): s is string => !!s && SENTIMENT_SCORES[s] != null)
    .map((s) => SENTIMENT_SCORES[s]);
  return average(scores);
}

export function classifyChannel(record: CallRecord): ChannelLabel {
  const category = record.call_summary?.call_category?.toLowerCase() ?? "";
  if (category.includes("billing") || record.billing_details) return "Billing";
  if (category.includes("troubleshoot") || record.equipment_issue) {
    return "Troubleshooting";
  }
  return "Voice";
}

export function bucketByChannel(
  records: CallRecord[]
): Record<ChannelLabel, CallRecord[]> {
  const buckets: Record<ChannelLabel, CallRecord[]> = {
    Voice: [],
    Billing: [],
    Troubleshooting: [],
  };
  for (const record of records) {
    buckets[classifyChannel(record)].push(record);
  }
  return buckets;
}

export function buildWeeklyVolumeSeries(records: CallRecord[]): VolumePoint[] {
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, idx) => subDays(today, 6 - idx));
  return days.map((day) => {
    const callsForDay = records.filter((r) => {
      const parsed = getRecordCallDate(r);
      return parsed != null && isSameDay(parsed, day);
    });
    const count = callsForDay.length;
    const resolvedCount = callsForDay.filter((r) => !r.follow_up_required).length;
    const followUpCount = callsForDay.filter((r) => r.follow_up_required).length;
    const otherCount = Math.max(count - resolvedCount - followUpCount, 0);
    return { day, count, resolvedCount, followUpCount, otherCount };
  });
}

export function maxVolumeCount(series: { count: number }[]): number {
  return Math.max(series.reduce((m, p) => (p.count > m ? p.count : m), 0), 1);
}

export function filterRecordsInWindow(
  records: CallRecord[],
  windowDays: number,
  now = new Date()
): CallRecord[] {
  const msPerDay = 24 * 60 * 60 * 1000;
  return records.filter((r) => {
    const parsed = getRecordCallDate(r);
    if (!parsed) return false;
    const diffMs = now.getTime() - parsed.getTime();
    return diffMs >= 0 && diffMs <= windowDays * msPerDay;
  });
}

export function aiResolutionRate(records: CallRecord[]): number {
  if (records.length === 0) return 0;
  const resolved = records.filter((r) => !r.follow_up_required).length;
  return Math.round((resolved / records.length) * 100);
}

export function agentPerformanceFromBuckets(
  buckets: Record<ChannelLabel, CallRecord[]>,
  total: number
): { name: string; value: number; tone: string }[] {
  const perfScale = (value: number) =>
    total > 0 ? Math.min(98, 70 + Math.round((value / total) * 25)) : 80;

  return AGENT_CO_PILOTS.map(({ name, tone, channel }) => ({
    name,
    tone,
    value: perfScale(buckets[channel].length || 1),
  }));
}
