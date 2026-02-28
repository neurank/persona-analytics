import ReactECharts from "echarts-for-react";
import type { AnalyticsEventFunnelSummary } from "../api/types";

interface EventsFunnelChartProps {
  data: AnalyticsEventFunnelSummary;
  theme?: "light" | "dark";
}

export function EventsFunnelChart({ data, theme = "light" }: EventsFunnelChartProps) {
  const rawLabels = [
    "Session started",
    "Answer submitted",
    "Payment succeeded",
  ];
  const rawData = [
    data.raw.sessionStartedEvents,
    data.raw.answerSubmittedEvents,
    data.raw.paymentSucceededEvents,
  ];

  const journeyData = [
    data.journeys.startedJourneys,
    data.journeys.answeredJourneys,
    data.journeys.paidJourneys,
  ];

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {
      type: "scroll",
      bottom: 0,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "20%",
      top: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: rawLabels,
    },
    yAxis: { type: "value" },
    series: [
      { name: "Raw события", type: "bar", data: rawData },
      { name: "Journeys", type: "bar", data: journeyData },
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
