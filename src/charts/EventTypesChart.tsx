import ReactECharts from "echarts-for-react";
import type { AnalyticsEventTypeCount } from "../api/types";

interface EventTypesChartProps {
  data: AnalyticsEventTypeCount[];
  theme?: "light" | "dark";
}

export function EventTypesChart({ data, theme = "light" }: EventTypesChartProps) {
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
            data: data.map((d) => d.eventType),
            axisLabel: { rotate: 45 },
          },
          yAxis: { type: "value" },
          series: [{ name: "Количество", type: "bar", data: data.map((d) => d.count) }],
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
