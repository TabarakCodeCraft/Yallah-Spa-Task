"use client";
import { Gift, PenLine, Send } from "lucide-react";
import { useI18n } from "./I18nProvider";
import type { Key } from "@/lib/i18n";

const points: { Icon: typeof Gift; t: Key; d: Key }[] = [
  { Icon: Gift, t: "h1t", d: "h1d" },
  { Icon: PenLine, t: "h2t", d: "h2d" },
  { Icon: Send, t: "h3t", d: "h3d" },
];
export default function Hero() {
  const { t } = useI18n();
  return (
    <section className="bg-gradient-to-b from-mint/50 to-cream px-4 pb-6 pt-12 text-center md:pt-16">
      <h1 className="text-3xl text-ink md:text-5xl">{t("heroTitle")}</h1>
      <p className="mx-auto mt-4 max-w-xl text-base font-light leading-8 opacity-80">
        {t("heroDesc")}
      </p>
      <ul className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-3">
        {points.map(({ Icon, t: title, d }) => (
          <li
            key={title}
            className="flex items-center gap-3 text-start sm:flex-col sm:text-center"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/50 text-gold">
              <Icon size={20} />
            </span>
            <div>
              <h3 className="text-lg text-ink">{t(title)}</h3>
              <p className="text-sm font-light opacity-70">{t(d)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
