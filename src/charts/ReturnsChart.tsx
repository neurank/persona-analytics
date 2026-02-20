import ReactECharts from "echarts-for-react";
import type { AnalyticsReturnsSummary } from "../api/types";

interface ReturnsChartProps {
  data: AnalyticsReturnsSummary;
  theme?: "light" | "dark";
}

export function ReturnsChart({ data, theme = "light" }: ReturnsChartProps) {
  const option = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { type: "scroll", bottom: 0 },
    grid: { left: "3%", right: "4%", bottom: "15%", top: "10%", containLabel: true },
    xAxis: {
      type: "category",
      data: ["Chat return users", "Questionnaire return users"],
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Пользователей",
        type: "bar",
        data: [data.chatReturnUsers, data.questionnaireReturnUsers],
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
