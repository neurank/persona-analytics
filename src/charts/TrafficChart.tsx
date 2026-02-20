import ReactECharts from "echarts-for-react";
import type { AnalyticsTrafficSourceSummary } from "../api/types";

interface TrafficChartProps {
  data: AnalyticsTrafficSourceSummary[];
  theme?: "light" | "dark";
}

export function TrafficChart({ data, theme = "light" }: TrafficChartProps) {
  const option = data.length === 0
    ? { title: { text: "Нет данных", left: "center", top: "center" } }
    : {
    tooltip: { trigger: "item" },
    legend: { type: "scroll", bottom: 0 },
    grid: { left: "3%", right: "4%", bottom: "15%", top: "10%", containLabel: true },
    xAxis: { type: "category", data: data.map((d) => d.source) },
    yAxis: { type: "value" },
    series: [
      { name: "Completed", type: "bar", data: data.map((d) => d.completed) },
      { name: "Paid", type: "bar", data: data.map((d) => d.paid) },
    ],
  };

  return data.length === 0 ? (
    <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span>Нет данных</span>
    </div>
  ) : (
    <ReactECharts
      option={option}
      theme={theme}
      notMerge
      style={{ height: 300 }}
      opts={{ renderer: "canvas" }}
    />
  );
}
