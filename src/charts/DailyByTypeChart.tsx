import ReactECharts from "echarts-for-react";
import type { AnalyticsDailyEventTypeCount } from "../api/types";

interface DailyByTypeChartProps {
  data: AnalyticsDailyEventTypeCount[];
  theme?: "light" | "dark";
}

export function DailyByTypeChart({ data, theme = "light" }: DailyByTypeChartProps) {
  // Pivot: unique days (sorted), unique eventTypes, series per eventType
  const daysSet = new Set<string>();
  const eventTypesSet = new Set<string>();
  for (const row of data) {
    daysSet.add(row.dayUtc);
    eventTypesSet.add(row.eventType);
  }
  const days = Array.from(daysSet).sort();
  const eventTypes = Array.from(eventTypesSet).sort();

  const lookup = new Map<string, number>();
  for (const row of data) {
    lookup.set(`${row.dayUtc}|${row.eventType}`, row.count);
  }

  const series = eventTypes.map((eventType) => ({
    name: eventType,
    type: "line",
    data: days.map((day) => lookup.get(`${day}|${eventType}`) ?? 0),
  }));

  const option =
    data.length === 0
      ? { title: { text: "Нет данных", left: "center", top: "center" } }
      : {
          tooltip: {
            trigger: "axis",
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
            data: days,
            boundaryGap: false,
            axisLabel: { rotate: 45 },
          },
          yAxis: { type: "value" },
          series,
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
