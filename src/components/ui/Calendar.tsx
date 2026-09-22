import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface CalendarProps {
  /** ISO yyyy-mm-dd, or "" for no selection. */
  value: string;
  onChange: (value: string) => void;
  /** ISO yyyy-mm-dd — dates before this are shown but disabled. */
  min: string;
}

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Local-date-safe: `new Date(iso)` parses as UTC midnight, which can land on
// the wrong day once shifted to a negative-UTC-offset local time. Building
// from y/m/d components keeps everything in local time throughout.
function fromISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/**
 * A small month-grid date picker — built in-house rather than pulling in a
 * date-picker dependency, matching how the rest of the site's interactive
 * pieces (Carousel, WizardOptionCard, etc.) are hand-rolled. Day cells are
 * plain `<button type="button">`s, so keyboard/tab behaviour comes for free.
 */
export function Calendar({ value, onChange, min }: CalendarProps) {
  const minDate = fromISO(min);
  const selected = value ? fromISO(value) : null;
  const [viewDate, setViewDate] = useState(() => selected ?? minDate);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const canGoPrevMonth = year > minDate.getFullYear() || (year === minDate.getFullYear() && month > minDate.getMonth());

  return (
    <div className="rounded-xl border border-white/15 bg-surface p-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          disabled={!canGoPrevMonth}
          aria-label="Previous month"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-20"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <p className="font-heading text-sm font-semibold uppercase tracking-wide" aria-live="polite">
          {MONTH_NAMES[month]} {year}
        </p>
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-muted" aria-hidden="true">
        {WEEKDAY_LABELS.map((w, i) => (
          <div key={i}>{w}</div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1" role="group" aria-label="Choose a preferred date">
        {cells.map((date, i) => {
          if (!date) return <div key={`pad-${i}`} aria-hidden="true" />;

          const iso = toISO(date);
          const disabled = iso < min;
          const isSelected = selected !== null && isSameDay(date, selected);

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onChange(iso)}
              aria-pressed={isSelected}
              aria-label={date.toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              className={cn(
                "flex h-10 w-full items-center justify-center rounded-lg text-sm transition-colors",
                disabled && "cursor-not-allowed text-white/15",
                !disabled && !isSelected && "text-white/80 hover:bg-white/10",
                isSelected && "bg-blue-bright font-semibold text-white",
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
