import type { AnalyticsRepeatPurchasesSummary } from "../../api/types";
import "./RepeatPanel.css";

interface RepeatPanelProps {
  data: AnalyticsRepeatPurchasesSummary;
}

export function RepeatPanel({ data }: RepeatPanelProps) {
  return (
    <div className="repeat-panel">
      <p className="repeat-panel__value">{data.repeatPurchasersLifetimeToUtc}</p>
      <p className="repeat-panel__label">
        пользователей с 2+ успешными оплатами (lifetime)
      </p>
    </div>
  );
}
