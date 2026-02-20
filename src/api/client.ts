import type { AnalyticsSummaryResponse } from "./types";

const STORAGE_KEY = "persona-analytics-env";

export type ApiEnv = "dev" | "prod";

export function getApiBaseUrl(env: ApiEnv): string {
  if (env === "dev") {
    return import.meta.env.VITE_DEV_API_URL ?? "http://localhost:5000";
  }
  return import.meta.env.VITE_PROD_API_URL ?? "/api";
}

export function getStoredEnv(): ApiEnv {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "dev" || stored === "prod" ? stored : "prod";
  } catch {
    return "prod";
  }
}

export function setStoredEnv(env: ApiEnv): void {
  try {
    localStorage.setItem(STORAGE_KEY, env);
  } catch {
    /* ignore */
  }
}

export interface FetchSummaryParams {
  fromUtc: string;
  toUtc: string;
  cohortCutoffUtc?: string;
}

export interface FetchSummaryOptions {
  baseUrl: string;
  adminKey?: string;
}

export async function fetchSummary(
  params: FetchSummaryParams,
  options: FetchSummaryOptions
): Promise<AnalyticsSummaryResponse> {
  const url = new URL(`${options.baseUrl}/internal/analytics/summary`);
  url.searchParams.set("fromUtc", params.fromUtc);
  url.searchParams.set("toUtc", params.toUtc);
  if (params.cohortCutoffUtc) {
    url.searchParams.set("cohortCutoffUtc", params.cohortCutoffUtc);
  }

  const headers: Record<string, string> = {};
  if (options.adminKey) {
    headers["X-Admin-Key"] = options.adminKey;
  }

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
}
