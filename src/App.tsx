import { useState, useEffect, useCallback } from "react";
import { subDays } from "date-fns";
import { Header } from "./components/Header/Header";
import { DateRangePicker, type DateRangeState } from "./components/DateRangePicker/DateRangePicker";
import { Tabs, type TabId } from "./components/Tabs/Tabs";
import { PaymentsChart } from "./charts/PaymentsChart";
import { ConversionChart } from "./charts/ConversionChart";
import { ReturnsChart } from "./charts/ReturnsChart";
import { TrafficChart } from "./charts/TrafficChart";
import { TrafficTable } from "./components/TrafficTable/TrafficTable";
import { RepeatPanel } from "./components/RepeatPanel/RepeatPanel";
import { useAnalytics } from "./hooks/useAnalytics";
import { useColorScheme } from "./hooks/useColorScheme";
import "./App.css";

const toIso = (d: Date) => d.toISOString();

function getDefaultRange(): DateRangeState {
  const to = new Date();
  const from = subDays(to, 30);
  return { from, to, preset: "30d" };
}

export default function App() {
  const { env, setEnv, data, loading, error, loadSummary } = useAnalytics();
  const colorScheme = useColorScheme();
  const [range, setRange] = useState<DateRangeState>(getDefaultRange);
  const [activeTab, setActiveTab] = useState<TabId>("payments");

  const refresh = useCallback(() => {
    loadSummary(toIso(range.from), toIso(range.to), toIso(range.to)).catch(
      () => {}
    );
  }, [loadSummary, range.from, range.to]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", colorScheme);
  }, [colorScheme]);

  return (
    <div className="analytics">
      <Header env={env} onEnvChange={setEnv} />
      <main className="analytics__main">
        <section className="analytics__controls">
          <DateRangePicker range={range} onChange={setRange} />
          <button
            type="button"
            className="analytics__refresh"
            onClick={refresh}
            disabled={loading}
          >
            {loading ? "Загрузка…" : "Обновить"}
          </button>
        </section>

        {error && (
          <div className="analytics__error" role="alert">
            {error}
          </div>
        )}

        <Tabs active={activeTab} onSelect={setActiveTab} />

        <div className="analytics__content" role="tabpanel">
          {data && (
            <>
              {activeTab === "payments" && (
                <div className="analytics__panel">
                  <h2 className="analytics__panel-title">Payments</h2>
                  <PaymentsChart data={data.payments} theme={colorScheme} />
                </div>
              )}
              {activeTab === "conversion" && (
                <div className="analytics__panel">
                  <h2 className="analytics__panel-title">Conversion</h2>
                  <ConversionChart data={data.conversion} theme={colorScheme} />
                </div>
              )}
              {activeTab === "returns" && (
                <div className="analytics__panel">
                  <h2 className="analytics__panel-title">Returns</h2>
                  <ReturnsChart data={data.returns} theme={colorScheme} />
                </div>
              )}
              {activeTab === "traffic" && (
                <div className="analytics__panel">
                  <h2 className="analytics__panel-title">Traffic Sources</h2>
                  <TrafficChart data={data.trafficSources} theme={colorScheme} />
                  <div className="analytics__panel-section">
                    <TrafficTable data={data.trafficSources} />
                  </div>
                </div>
              )}
              {activeTab === "repeat" && (
                <div className="analytics__panel">
                  <h2 className="analytics__panel-title">Repeat Purchases</h2>
                  <RepeatPanel data={data.repeatPurchases} />
                </div>
              )}
            </>
          )}
          {!data && !loading && !error && (
            <p className="analytics__empty">Выберите диапазон и нажмите «Обновить»</p>
          )}
        </div>
      </main>
    </div>
  );
}
