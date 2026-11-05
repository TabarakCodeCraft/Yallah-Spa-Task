"use client";
import { Clock, Search } from "lucide-react";
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
    <div className="space-y-5">
      <div className="relative">
        <Search
          size={18}
          className="absolute start-4 top-1/2 -translate-y-1/2 opacity-50"
        />
        <input
          className="input ps-11"
          placeholder={t("search")}
          value={query}
          onChange={(e) => onQuery(e.target.value)}
        />
      </div>
      {list.length === 0 && (
        <p className="rounded-xl bg-sand p-6 text-center">{t("noResults")}</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((it) => (
          <button
            key={it.id}
            onClick={() => onSelect(it.id)}
            aria-pressed={selected === it.id}
            className={`rounded-2xl border-2 bg-cream p-5 text-start transition hover:shadow-md ${selected === it.id ? "border-olive shadow-md" : "border-transparent"}`}
          >
            <span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-mint text-ink">
              <it.icon size={22} />
            </span>
            <h3 className="font-bold text-ink">{pick(it.name)}</h3>
            <p className="mt-1 text-sm opacity-70">{pick(it.desc)}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 opacity-70">
                <Clock size={14} />
                {pick(it.duration)}
              </span>
              <b className="text-base text-ink">
                {it.price} {t("sar")}
              </b>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
