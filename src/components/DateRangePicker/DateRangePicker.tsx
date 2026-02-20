import { subDays } from "date-fns";
import "./DateRangePicker.css";

export type DatePreset = "7d" | "30d" | "90d" | "custom";

export interface DateRangeState {
  from: Date;
  to: Date;
  preset: DatePreset;
}

interface DateRangePickerProps {
  range: DateRangeState;
  onChange: (range: DateRangeState) => void;
}

export function DateRangePicker({ range, onChange }: DateRangePickerProps) {
  const applyPreset = (preset: DatePreset) => {
    const to = new Date();
    const from =
      preset === "7d"
        ? subDays(to, 7)
        : preset === "30d"
          ? subDays(to, 30)
          : preset === "90d"
            ? subDays(to, 90)
            : range.from;
    onChange({ from, to, preset });
  };

  const handleFromChange = (v: string) => {
    const from = new Date(v);
    if (!isNaN(from.getTime())) {
      onChange({ ...range, from });
    }
  };

  const handleToChange = (v: string) => {
    const to = new Date(v);
    if (!isNaN(to.getTime())) {
      onChange({ ...range, to });
    }
  };

  const formatForInput = (d: Date) =>
    d.toISOString().slice(0, 16);

  return (
    <div className="date-range-picker">
      <div className="date-range-picker__presets">
        {(["7d", "30d", "90d"] as const).map((p) => (
          <button
            key={p}
            type="button"
            className={`date-range-picker__preset ${
              range.preset === p ? "date-range-picker__preset--active" : ""
            }`}
            onClick={() => applyPreset(p)}
          >
            {p === "7d" ? "7 дней" : p === "30d" ? "30 дней" : "90 дней"}
          </button>
        ))}
      </div>
      <div className="date-range-picker__inputs">
        <label className="date-range-picker__label">
          <span className="date-range-picker__label-text">От</span>
          <input
            type="datetime-local"
            className="date-range-picker__input"
            value={formatForInput(range.from)}
            onChange={(e) => {
              handleFromChange(e.target.value);
              onChange({ ...range, preset: "custom" });
            }}
          />
        </label>
        <label className="date-range-picker__label">
          <span className="date-range-picker__label-text">До</span>
          <input
            type="datetime-local"
            className="date-range-picker__input"
            value={formatForInput(range.to)}
            onChange={(e) => {
              handleToChange(e.target.value);
              onChange({ ...range, preset: "custom" });
            }}
          />
        </label>
      </div>
    </div>
  );
}
