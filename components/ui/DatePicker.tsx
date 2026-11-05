"use client";
import { useMemo, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "../I18nProvider";
import { useOutside } from "./useOutside";

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const midnight = (d = new Date()) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};
interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}

export default function DatePicker({ label, value, onChange, error }: Props) {
  const { lang, t } = useI18n();
  const today = midnight();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const ref = useRef<HTMLDivElement>(null);
  useOutside(ref, () => setOpen(false));

  const loc = lang === "ar" ? "ar-SA-u-ca-gregory-nu-latn" : "en-US";
  const fmt = (o: Intl.DateTimeFormatOptions, d: Date) =>
    new Intl.DateTimeFormat(loc, o).format(d);
  const weekdays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) =>
        new Intl.DateTimeFormat(loc, { weekday: "narrow" }).format(
          new Date(2023, 0, 1 + i),
        ),
      ),
    [loc],
  );
  const days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells = [
    ...Array(view.getDay()).fill(null),
    ...Array.from(
      { length: days },
      (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1),
    ),
  ];
  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1);
  const [Prev, Next] =
    lang === "ar" ? [ChevronRight, ChevronLeft] : [ChevronLeft, ChevronRight];

  const choose = (d: Date) => {
    onChange(iso(d));
    setView(new Date(d.getFullYear(), d.getMonth(), 1));
    setOpen(false);
  };
  const shift = (n: number) =>
    setView(new Date(view.getFullYear(), view.getMonth() + n, 1));
  const tomorrow = new Date(today.getTime() + 864e5);

  return (
    <div ref={ref} className="relative space-y-1.5">
      <span className="text-sm font-medium text-ink">{label}</span>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center gap-3 rounded-xl border bg-white px-4 py-3.5 text-start transition ${open ? "border-olive ring-2 ring-olive/10" : "border-sand hover:border-olive/40"}`}
      >
        <CalendarDays size={18} className="text-gold" />
        <span className={value ? "text-ink" : "opacity-50"}>
          {value
            ? fmt(
                {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                },
                new Date(value + "T00:00:00"),
              )
            : t("pickDate")}
        </span>
      </button>
      {error && (
        <span role="alert" className="block text-[13px] text-red-600">
          {error}
        </span>
      )}
      {open && (
        <div
          role="dialog"
          className="absolute start-0 z-30 mt-2 w-full space-y-3 rounded-2xl border border-sand bg-white p-4 shadow-xl sm:w-80"
        >
          <div className="flex gap-2">
            {[
              [t("today"), today],
              [t("tomorrow"), tomorrow],
            ].map(([l, d]) => (
              <button
                key={l as string}
                type="button"
                onClick={() => choose(d as Date)}
                className="flex-1 rounded-lg bg-mint/50 py-1.5 text-sm font-medium text-ink transition hover:bg-mint"
              >
                {l as string}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              disabled={!canPrev}
              onClick={() => shift(-1)}
              aria-label="prev"
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-sand disabled:opacity-30"
            >
              <Prev size={18} />
            </button>
            <span className="font-display font-semibold text-ink">
              {fmt({ month: "long", year: "numeric" }, view)}
            </span>
            <button
              type="button"
              onClick={() => shift(1)}
              aria-label="next"
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-sand"
            >
              <Next size={18} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {weekdays.map((w, i) => (
              <span key={i} className="py-1 text-xs opacity-50">
                {w}
              </span>
            ))}
            {cells.map((d, i) => {
              if (!d) return <span key={i} />;
              const past = d < today,
                sel = iso(d) === value;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={past}
                  onClick={() => choose(d)}
                  className={`grid aspect-square place-items-center rounded-full transition ${sel ? "bg-olive text-white" : "hover:bg-sand"} ${iso(d) === iso(today) && !sel ? "ring-1 ring-gold" : ""} ${past ? "opacity-25" : ""}`}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
