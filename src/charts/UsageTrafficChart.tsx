import ReactECharts from "echarts-for-react";
import type { AnalyticsUsageTrafficSourceCount } from "../api/types";

interface UsageTrafficChartProps {
  data: AnalyticsUsageTrafficSourceCount[];
  theme?: "light" | "dark";
}

export function UsageTrafficChart({ data, theme = "light" }: UsageTrafficChartProps) {
  const option =
    data.length === 0
      ? { title: { text: "Нет данных", left: "center", top: "center" } }
      : {
          tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "10%",
            top: "5%",
            containLabel: true,
          },
          xAxis: { type: "category", data: data.map((d) => d.source) },
          yAxis: { type: "value" },
          series: [
            { name: "Количество", type: "bar", data: data.map((d) => d.count) },
          ],
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
