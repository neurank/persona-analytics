import ReactECharts from "echarts-for-react";
import type { AnalyticsConversionSummary } from "../api/types";

interface ConversionChartProps {
  data: AnalyticsConversionSummary;
  theme?: "light" | "dark";
}

export function ConversionChart({ data, theme = "light" }: ConversionChartProps) {
  const categories = ["Attempts", "Users"];
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {
      type: "scroll",
      bottom: 0,
    },
    grid: { left: "3%", right: "4%", bottom: "15%", top: "10%", containLabel: true },
    xAxis: { type: "category", data: categories },
    yAxis: { type: "value" },
    series: [
      {
        name: "Operational (same window)",
        type: "bar",
        data: [
          data.operational.attempts.paidSameWindow,
          data.operational.users.paidUsersSameWindow,
        ],
      },
      {
        name: "Operational completed",
        type: "bar",
        data: [
          data.operational.attempts.completed,
          data.operational.users.completedUsers,
        ],
      },
      {
        name: "Cohort (by cutoff)",
        type: "bar",
        data: [
          data.cohort.attempts.paidByCutoff,
          data.cohort.users.paidUsersByCutoff,
        ],
      },
      {
        name: "Cohort completed",
        type: "bar",
        data: [data.cohort.attempts.completed, data.cohort.users.completedUsers],
      },
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
