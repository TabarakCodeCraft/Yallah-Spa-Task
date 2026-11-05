"use client";
import { Check, Clock, Search } from "lucide-react";
import { Item } from "@/lib/data";
import { useI18n } from "./I18nProvider";

interface Props {
  list: Item[];
  selected: string;
  onSelect: (id: string) => void;
  query: string;
  onQuery: (q: string) => void;
}
export default function Catalog({
  list,
  selected,
  onSelect,
  query,
  onQuery,
}: Props) {
  const { t, pick } = useI18n();
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 opacity-50"
        />
        <input
          type="search"
          aria-label={t("search")}
          className="input ps-11"
          placeholder={t("search")}
          value={query}
          onChange={(e) => onQuery(e.target.value)}
        />
      </div>

      {list.length === 0 && (
        <p className="rounded-2xl bg-sand/60 p-8 text-center">
          {t("noResults")}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((it) => {
          const on = selected === it.id;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => onSelect(it.id)}
              aria-pressed={on}
              className={`relative flex flex-col rounded-2xl border bg-white p-5 text-start transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive/40 ${
                on
                  ? "border-olive bg-olive/[0.03] shadow-md ring-1 ring-olive"
                  : "border-sand hover:border-olive/40 hover:shadow-md"
              }`}
            >
              {on && (
                <span className="absolute end-4 top-4 grid h-6 w-6 place-items-center rounded-full bg-olive text-white">
                  <Check size={14} strokeWidth={3} />
                </span>
              )}
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-mint text-ink">
                <it.icon size={22} />
              </span>
              <h3 className="font-bold text-ink">{pick(it.name)}</h3>
              <p className="mt-1 flex-1 text-sm leading-relaxed opacity-70">
                {pick(it.desc)}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-sand/70 pt-3 text-sm">
                <span className="flex items-center gap-1.5 opacity-70">
                  <Clock size={14} />
                  {pick(it.duration)}
                </span>
                <b className="text-base tabular-nums text-ink">
                  {it.price} {t("sar")}
                </b>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
