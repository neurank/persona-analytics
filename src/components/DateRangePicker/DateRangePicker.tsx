import { subDays } from "date-fns";
import { ru } from "date-fns/locale";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangePicker.css";

registerLocale("ru", ru);

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

const DATE_FORMAT = "dd.MM.yyyy HH:mm";

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

  const handleFromChange = (date: Date | null) => {
    if (date) {
      onChange({ ...range, from: date, preset: "custom" });
    }
  };

  const handleToChange = (date: Date | null) => {
    if (date) {
      onChange({ ...range, to: date, preset: "custom" });
    }
  };

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
          <DatePicker
            selected={range.from}
            onChange={handleFromChange}
            locale="ru"
            dateFormat={DATE_FORMAT}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            timeCaption="Время"
            calendarStartDay={1}
            className="date-range-picker__input"
          />
        </label>
        <label className="date-range-picker__label">
          <span className="date-range-picker__label-text">До</span>
          <DatePicker
            selected={range.to}
            onChange={handleToChange}
            locale="ru"
            dateFormat={DATE_FORMAT}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            timeCaption="Время"
            calendarStartDay={1}
            className="date-range-picker__input"
          />
        </label>
      </div>
    </div>
  );
}
