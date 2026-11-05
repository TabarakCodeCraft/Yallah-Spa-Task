"use client";
import { branches, cards, Item } from "@/lib/data";
import { useI18n } from "./I18nProvider";
import type { FormState } from "@/lib/validation";

export default function Review({
  item,
  v,
  branch,
}: {
  item: Item;
  v: FormState;
  branch: string;
}) {
  const { t, pick } = useI18n();
  const card = cards.find((c) => c.id === v.card)!;
  const b = branches.find((x) => x.id === branch);
  const rows: [string, string | undefined][] = [
    [t("branch"), b && pick(b.name)],
    [t("from"), v.sender],
    [t("to"), v.recipient],
    [t("recipientPhone"), v.recipientPhone],
    [t("date"), v.date],
  ];
  return (
    <div className="space-y-6">
      <div
        className={`rounded-2xl bg-gradient-to-br ${card.cls} px-6 py-8 text-center md:px-10`}
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/70 text-ink">
          <item.icon size={26} />
        </span>
        <h3 className="mt-3 text-xl font-bold text-ink">{pick(item.name)}</h3>
        <p
          className="mx-auto mt-3 max-w-md leading-relaxed text-ink/80"
          dir="auto"
        >
          “{v.message || t("defaultMsg")}”
        </p>
      </div>

      <dl className="overflow-hidden rounded-2xl border border-sand">
        <div className="divide-y divide-sand/70 px-5">
          {rows.map(([k, val]) => (
            <div
              key={k}
              className="flex items-baseline justify-between gap-4 py-3.5 text-sm"
            >
              <dt className="shrink-0 opacity-60">{k}</dt>
              <dd className="text-end font-medium text-ink" dir="auto">
                {val || "—"}
              </dd>
            </div>
          ))}
        </div>
        <div className="flex items-baseline justify-between bg-cream/60 px-5 py-4">
          <dt className="font-semibold text-ink">{t("total")}</dt>
          <dd className="text-xl font-bold tabular-nums text-ink">
            {item.price} {t("sar")}
          </dd>
        </div>
      </dl>
    </div>
  );
}
