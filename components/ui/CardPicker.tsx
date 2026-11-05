"use client";
import { Check, Gift } from "lucide-react";
import { cards } from "@/lib/data";
import { useI18n } from "../I18nProvider";

export default function CardPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (id: string) => void;
}) {
  const { pick } = useI18n();
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-ink">{label}</p>
      <div
        role="radiogroup"
        aria-label={label}
        className="grid grid-cols-3 gap-3"
      >
        {cards.map((c) => {
          const on = value === c.id;
          return (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(c.id)}
              className={`relative flex aspect-[3/2] flex-col items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-br ${c.cls} text-ink transition hover:-translate-y-0.5 hover:shadow-md ${on ? "ring-2 ring-olive ring-offset-2" : "ring-1 ring-black/5"}`}
            >
              <span className="pointer-events-none absolute inset-1.5 rounded-xl border border-white/70" />
              <Gift size={20} className="opacity-70" />
              <span className="text-sm font-semibold">{pick(c.name)}</span>
              {on && (
                <span className="absolute end-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-olive text-white">
                  <Check size={12} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
