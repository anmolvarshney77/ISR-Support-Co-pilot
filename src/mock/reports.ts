import {
  demoReportsSeed,
  type DemoReport,
  type DemoReportTemplate,
} from "./app-demo-data";

const REPORT_STORAGE_KEY = "ur_demo_reports";

/**
 * Read the current list of demo reports from localStorage.
 * Falls back to a small seeded list from the unified demo data file.
 */
export async function getReports(): Promise<DemoReport[]> {
  if (typeof window === "undefined") {
    return demoReportsSeed;
  }
  try {
    const raw = window.localStorage.getItem(REPORT_STORAGE_KEY);
    if (!raw) return demoReportsSeed;
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return parsed as DemoReport[];
    }
    return demoReportsSeed;
  } catch {
    return demoReportsSeed;
  }
}

/**
 * Append a new report entry and return the updated list.
 */
export async function addReport(template: DemoReportTemplate): Promise<DemoReport[]> {
  if (typeof window === "undefined") {
    return demoReportsSeed;
  }

  const now = new Date();
  const id = `${template.name}-${now.toISOString()}`;
  const generatedAt = now.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const newReport: DemoReport = {
    id,
    name: template.name,
    cadence: template.cadence,
    status: "Ready",
    generatedAt,
  };

  const existing = await getReports();
  const next = [newReport, ...existing].slice(0, 20);
  try {
    window.localStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore write failures for mock API
  }
  return next;
}

export type { DemoReport } from "./app-demo-data";

