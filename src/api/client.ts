import type { AnalyticsSummaryResponse } from "./types";

/**
 * API base URL. Всегда относительный /api — backend определяется тем,
 * на какой порт идёт туннель (8765 dev, 8766 prod).
 */
export function getApiBaseUrl(): string {
  return "/api";
}

export interface FetchSummaryParams {
  fromUtc: string;
  toUtc: string;
  cohortCutoffUtc?: string;
}

export interface FetchSummaryOptions {
  baseUrl: string;
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

  const res = await fetch(url.toString());
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
}
