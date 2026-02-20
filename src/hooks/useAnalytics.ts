import { useState, useCallback } from "react";
import { fetchSummary, getApiBaseUrl } from "../api/client";
import type { AnalyticsSummaryResponse } from "../api/types";

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsSummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSummary = useCallback(
    async (fromUtc: string, toUtc: string, cohortCutoffUtc?: string) => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = getApiBaseUrl();
        const summary = await fetchSummary(
          { fromUtc, toUtc, cohortCutoffUtc },
          { baseUrl }
        );
        setData(summary);
        return summary;
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        setError(message);
        setData(null);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, loadSummary };
}
