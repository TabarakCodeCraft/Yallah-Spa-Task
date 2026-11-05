"use client";
import { Gift } from "lucide-react";
import { branches, cards, Item } from "@/lib/data";
import { useI18n } from "./I18nProvider";

interface Props { item?: Item; branch: string; card: string; recipient: string }
export default function Summary({ item, branch, card, recipient }: Props) {
  const { t, pick } = useI18n();
  const c = cards.find((x) => x.id === card)!;
  const b = branches.find((x) => x.id === branch);
  const Icon = item?.icon ?? Gift;
  return (
    <aside className="card sticky top-32 mt-[104px] hidden space-y-4 p-6 lg:block">
      <h2 className="text-xl text-ink">{t("summary")}</h2>
      <div className={`grid h-36 place-items-center rounded-2xl bg-gradient-to-br ${c.cls} text-center`}>
        <div><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white/70 text-ink"><Icon size={22} /></span>
          <p className="mt-2 text-sm font-medium">{recipient ? `${t("to")} ${recipient}` : t("giftCard")}</p></div>
      </div>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between"><dt className="opacity-60">{t("branch")}</dt><dd>{b ? pick(b.name) : "—"}</dd></div>
        <div className="flex justify-between"><dt className="opacity-60">{t("gift")}</dt><dd>{item ? pick(item.name) : "—"}</dd></div>
        <div className="flex justify-between border-t border-sand pt-3 text-base font-bold text-ink"><dt>{t("total")}</dt><dd>{item ? `${item.price} ${t("sar")}` : "—"}</dd></div>
      </dl>
    </aside>
  );
}
