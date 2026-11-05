"use client";
import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Gift,
  MapPin,
  User,
} from "lucide-react";
import { branches } from "@/lib/data";
import { useGiftFlow, LAST_STEP } from "@/hooks/useGiftFlow";
import { useI18n } from "@/components/I18nProvider";
import type { Key } from "@/lib/i18n";
import Hero from "@/components/Hero";
import Stepper from "@/components/Stepper";
import Catalog from "@/components/Catalog";
import GiftForm from "@/components/GiftForm";
import Review from "@/components/Review";
import Summary from "@/components/Summary";
import Select from "@/components/ui/Select";

const titles: [Key, Key][] = [
  ["title1", "desc1"],
  ["title2", "desc2"],
  ["title3", "desc3"],
  ["title4", "desc4"],
];

const types = [
  ["session", "sessions", User],
  ["package", "giftPackages", Gift],
] as const;

export default function Page() {
  const g = useGiftFlow();
  const { t, pick, lang } = useI18n();
  const [Forward, Backward] =
    lang === "ar" ? [ArrowLeft, ArrowRight] : [ArrowRight, ArrowLeft];

  const cardRef = useRef<HTMLElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [g.step]);

  if (g.done)
    return (
      <main className="grid min-h-[70vh] place-items-center p-6">
        <div className="card w-full max-w-md space-y-5 p-8 text-center md:p-10">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-olive/10">
            <CheckCircle2 size={44} className="text-olive" />
          </span>
          <div className="space-y-2">
            <h1 className="text-3xl text-ink">{t("okTitle")}</h1>
            <p className="leading-relaxed opacity-80">
              {t("okDesc")}{" "}
              <b className="font-semibold text-ink">{g.form.recipient}</b>{" "}
              {t("on")}{" "}
              <b className="font-semibold text-ink" dir="auto">
                {g.form.date}
              </b>
            </p>
          </div>
          <button className="btn-primary w-full" onClick={g.reset}>
            {t("newGift")}
          </button>
        </div>
      </main>
    );

  return (
    <main>
      <Hero />

      <div className="mx-auto max-w-6xl px-3 pb-10 pt-5 sm:px-4 sm:pt-8 md:pb-16">
        <div className="mx-auto mb-5 max-w-3xl sm:mb-8">
          <Stepper step={g.step} />
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px] lg:gap-8">
          <section ref={cardRef} className="card scroll-mt-20">
            <div className="flex items-start justify-between gap-3 rounded-t-3xl border-b border-sand/70 bg-cream/60 px-4 py-4 sm:px-6 md:px-8 md:py-6">
              <div className="min-w-0 space-y-1">
                <h2 className="text-xl text-ink md:text-2xl">
                  {t(titles[g.step][0])}
                </h2>
                <p className="text-[13px] leading-relaxed opacity-70 md:text-sm">
                  {t(titles[g.step][1])}
                </p>
              </div>

              <span
                dir="ltr"
                className="mt-1 shrink-0 rounded-full bg-white px-3 py-1 text-xs font-medium tabular-nums text-olive ring-1 ring-sand"
              >
                {g.step + 1} / {LAST_STEP + 1}
              </span>
            </div>

            <div className="p-6 md:p-8">
              {g.step === 0 && (
                <div className="space-y-6">
                  <Select
                    label={t("branchLabel")}
                    placeholder={t("branchPh")}
                    icon={MapPin}
                    value={g.branch}
                    onChange={g.setBranch}
                    options={branches.map((b) => ({
                      value: b.id,
                      label: pick(b.name),
                    }))}
                  />

                  <div
                    role="radiogroup"
                    aria-label={t(titles[0][0])}
                    className="grid grid-cols-2 gap-3"
                  >
                    {types.map(([k, label, Icon]) => {
                      const on = g.type === k;
                      return (
                        <button
                          key={k}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => g.changeType(k)}
                          className={`relative flex flex-col items-center gap-3 rounded-2xl border px-4 py-6 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive/40 ${
                            on
                              ? "border-olive bg-olive/[0.04] shadow-sm ring-1 ring-olive"
                              : "border-sand bg-white hover:border-olive/40"
                          }`}
                        >
                          {on && (
                            <span className="absolute end-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-olive text-white">
                              <Check size={12} strokeWidth={3} />
                            </span>
                          )}
                          <span
                            className={`grid h-12 w-12 place-items-center rounded-full transition ${
                              on ? "bg-olive text-white" : "bg-sand text-olive"
                            }`}
                          >
                            <Icon size={22} />
                          </span>
                          <span
                            className={`font-semibold ${on ? "text-ink" : "text-ink/70"}`}
                          >
                            {t(label)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              {g.step === 1 && (
                <Catalog
                  list={g.list}
                  selected={g.itemId}
                  onSelect={g.setItemId}
                  query={g.query}
                  onQuery={g.setQuery}
                />
              )}
              {g.step === 2 && (
                <GiftForm v={g.form} set={g.patchForm} errors={g.errors} />
              )}
              {g.step === 3 && g.item && (
                <Review item={g.item} v={g.form} branch={g.branch} />
              )}
            </div>

            <div className="flex items-center justify-between gap-3 rounded-b-3xl border-t border-sand/70 bg-white/95 px-6 py-4 backdrop-blur max-lg:sticky max-lg:bottom-0 max-lg:z-20 md:px-8">
              <button
                type="button"
                className="btn text-olive/80 hover:bg-sand disabled:invisible"
                disabled={g.step === 0}
                onClick={g.back}
              >
                <Backward size={16} />
                {t("back")}
              </button>

              {g.item && (
                <span className="font-bold tabular-nums text-ink lg:hidden">
                  {g.item.price} {t("sar")}
                </span>
              )}

              {g.step < LAST_STEP ? (
                <button
                  type="button"
                  className="btn-primary min-w-28 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!g.canNext}
                  onClick={g.next}
                >
                  {t("next")}
                  <Forward size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-primary min-w-28"
                  onClick={g.confirm}
                >
                  <Check size={16} />
                  {t("confirm")}
                </button>
              )}
            </div>
          </section>

          <Summary
            item={g.item}
            branch={g.branch}
            card={g.form.card}
            recipient={g.form.recipient}
          />
        </div>
      </div>
    </main>
  );
}
