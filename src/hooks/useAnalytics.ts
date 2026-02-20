import { useState, useCallback } from "react";
import { fetchSummary, getApiBaseUrl, getStoredEnv, setStoredEnv, type ApiEnv } from "../api/client";
import type { AnalyticsSummaryResponse } from "../api/types";

export function useAnalytics() {
  const [env, setEnvState] = useState<ApiEnv>(getStoredEnv);
  const [data, setData] = useState<AnalyticsSummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setEnv = useCallback((newEnv: ApiEnv) => {
    setEnvState(newEnv);
    setStoredEnv(newEnv);
  }, []);

  const loadSummary = useCallback(
    async (fromUtc: string, toUtc: string, cohortCutoffUtc?: string) => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = getApiBaseUrl(env);
        const adminKey = env === "dev" ? import.meta.env.VITE_DEV_ADMIN_KEY : undefined;
        const summary = await fetchSummary(
          { fromUtc, toUtc, cohortCutoffUtc },
          { baseUrl, adminKey }
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
    [env]
  );

  return { env, setEnv, data, loading, error, loadSummary };
}
