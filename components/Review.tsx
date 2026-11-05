"use client";
import { branches, cards, Item } from "@/lib/data";
import { useI18n } from "./I18nProvider";
import type { FormState } from "@/lib/validation";

export default function Review({ item, v, branch }: { item: Item; v: FormState; branch: string }) {
  const { t, pick } = useI18n();
  const card = cards.find((c) => c.id === v.card)!;
  const b = branches.find((x) => x.id === branch);
  const rows: [string, string | undefined][] = [[t("branch"), b && pick(b.name)], [t("from"), v.sender], [t("to"), v.recipient], [t("recipientPhone"), v.recipientPhone], [t("date"), v.date]];
  return (
    <div className="space-y-5">
      <div className={`rounded-2xl bg-gradient-to-br ${card.cls} p-8 text-center`}>
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/70 text-ink"><item.icon size={26} /></span>
        <h3 className="mt-3 text-xl font-bold text-ink">{pick(item.name)}</h3>
        <p className="mt-3 italic opacity-80">“{v.message || t("defaultMsg")}”</p>
      </div>
      <dl className="divide-y divide-sand rounded-2xl border border-sand px-4">
        {rows.map(([k, val]) => (<div key={k} className="flex justify-between gap-4 py-3"><dt className="opacity-60">{k}</dt><dd className="font-medium text-ink" dir="auto">{val}</dd></div>))}
        <div className="flex justify-between py-3 text-lg font-bold text-ink"><dt>{t("total")}</dt><dd>{item.price} {t("sar")}</dd></div>
      </dl>
    </div>
  );
}
