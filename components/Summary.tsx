"use client";
import { Gift } from "lucide-react";
import { branches, cards, Item } from "@/lib/data";
import { useI18n } from "./I18nProvider";

interface Props {
  item?: Item;
  branch: string;
  card: string;
  recipient: string;
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-sm">
      <dt className="shrink-0 opacity-60">{label}</dt>
      <dd
        className={`truncate text-end ${value ? "font-medium text-ink" : "text-ink/30"}`}
        dir="auto"
      >
        {value || "—"}
      </dd>
    </div>
  );
}

export default function Summary({ item, branch, card, recipient }: Props) {
  const { t, pick } = useI18n();
  const c = cards.find((x) => x.id === card)!;
  const b = branches.find((x) => x.id === branch);
  const Icon = item?.icon ?? Gift;

  return (
    <aside
      aria-label={t("summary")}
      className="card sticky top-24 hidden overflow-hidden lg:block"
    >
      <h2 className="border-b border-sand/70 px-6 py-4 text-lg text-ink">
        {t("summary")}
      </h2>

      <div className="space-y-5 p-6">
        <div
          className={`grid h-36 place-items-center rounded-2xl bg-gradient-to-br ${c.cls} text-center`}
        >
          <div className="px-4">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white/70 text-ink">
              <Icon size={22} />
            </span>
            <p
              className="mt-2 truncate text-sm font-medium text-ink"
              dir="auto"
            >
              {recipient ? `${t("to")} ${recipient}` : t("giftCard")}
            </p>
          </div>
        </div>

        <dl className="space-y-3">
          <Row label={t("branch")} value={b && pick(b.name)} />
          <Row label={t("gift")} value={item && pick(item.name)} />
        </dl>
      </div>

      <div className="flex items-baseline justify-between border-t border-sand/70 bg-cream/60 px-6 py-4">
        <span className="font-semibold text-ink">{t("total")}</span>
        <span
          className={`text-xl font-bold tabular-nums ${item ? "text-ink" : "text-ink/30"}`}
        >
          {item ? `${item.price} ${t("sar")}` : "—"}
        </span>
      </div>
    </aside>
  );
}
