import ReactECharts from "echarts-for-react";
import type { AnalyticsHourlyCount } from "../api/types";

interface HourlyChartProps {
  data: AnalyticsHourlyCount[];
  theme?: "light" | "dark";
}

export function HourlyChart({ data, theme = "light" }: HourlyChartProps) {
  // data should have hours 0-23 in order
  const sorted = [...data].sort((a, b) => a.hourUtc - b.hourUtc);
  const hours = sorted.map((d) => `${d.hourUtc.toString().padStart(2, "0")}:00 UTC`);
  const counts = sorted.map((d) => d.count);

  const option =
    data.length === 0
      ? { title: { text: "Нет данных", left: "center", top: "center" } }
      : {
          tooltip: {
            trigger: "axis",
            axisPointer: { type: "shadow" },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "10%",
            top: "5%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            data: hours,
          },
          yAxis: { type: "value" },
          series: [{ name: "Количество", type: "bar", data: counts }],
        };

  return (
    <ReactECharts
      option={option}
      theme={theme}
      notMerge
      style={{ height: 300 }}
      opts={{ renderer: "canvas" }}
    />
  );
}
