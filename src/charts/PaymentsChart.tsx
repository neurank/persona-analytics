import ReactECharts from "echarts-for-react";
import type { AnalyticsPaymentsSummary } from "../api/types";

interface PaymentsChartProps {
  data: AnalyticsPaymentsSummary;
  theme?: "light" | "dark";
}

export function PaymentsChart({ data, theme = "light" }: PaymentsChartProps) {
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
    xAxis: {
      type: "category",
      data: ["Gross", "Net (minus refunds)"],
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Количество",
        type: "bar",
        data: [data.grossSucceededCount, data.netSucceededMinusRefundedCount],
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
