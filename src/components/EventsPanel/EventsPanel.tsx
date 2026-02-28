import type { AnalyticsUsageEventsSummary } from "../../api/types";
import { EventTypesChart } from "../../charts/EventTypesChart";
import { DailyByTypeChart } from "../../charts/DailyByTypeChart";
import { HourlyChart } from "../../charts/HourlyChart";
import { UsageTrafficChart } from "../../charts/UsageTrafficChart";
import { EventsFunnelChart } from "../../charts/EventsFunnelChart";
import "./EventsPanel.css";

interface EventsPanelProps {
  data: AnalyticsUsageEventsSummary;
  theme?: "light" | "dark";
}

export function EventsPanel({ data, theme = "light" }: EventsPanelProps) {
  return (
    <div className="events-panel">
      <section className="events-panel__section">
        <h3 className="events-panel__section-title">Типы событий</h3>
        <EventTypesChart data={data.eventTypes} theme={theme} />
      </section>
      <section className="events-panel__section">
        <h3 className="events-panel__section-title">События по дням и типам (14 дней)</h3>
        <DailyByTypeChart data={data.dailyByTypeLast14Days} theme={theme} />
      </section>
      <section className="events-panel__section">
        <h3 className="events-panel__section-title">События по часам UTC (7 дней)</h3>
        <HourlyChart data={data.hourlyLast7DaysUtc} theme={theme} />
      </section>
      <section className="events-panel__section">
        <h3 className="events-panel__section-title">Источники трафика (события)</h3>
        <UsageTrafficChart data={data.trafficSources} theme={theme} />
      </section>
      <section className="events-panel__section">
        <h3 className="events-panel__section-title">Воронка</h3>
        <EventsFunnelChart data={data.funnel} theme={theme} />
      </section>
    </div>
  );
}
