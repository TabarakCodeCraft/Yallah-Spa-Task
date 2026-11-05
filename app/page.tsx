"use client";
import { ArrowLeft, ArrowRight, CheckCircle2, Gift, MapPin, User } from "lucide-react";
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

const titles: [Key, Key][] = [["title1", "desc1"], ["title2", "desc2"], ["title3", "desc3"], ["title4", "desc4"]];

export default function Page() {
  const g = useGiftFlow();
  const { t, pick, lang } = useI18n();
  const [Forward, Backward] = lang === "ar" ? [ArrowLeft, ArrowRight] : [ArrowRight, ArrowLeft];

  if (g.done) return (
    <main className="grid min-h-[60vh] place-items-center p-6 text-center">
      <div className="space-y-4"><CheckCircle2 size={64} className="mx-auto text-olive" />
        <h1 className="text-3xl text-ink">{t("okTitle")}</h1>
        <p>{t("okDesc")} {g.form.recipient} {t("on")} {g.form.date}</p>
        <button className="btn-primary" onClick={g.reset}>{t("newGift")}</button></div>
    </main>
  );

  return (
    <main>
      <Hero />
      <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 py-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Stepper step={g.step} />
          <section className="card">
            <div className="rounded-t-3xl border-b border-sand/70 bg-cream/60 px-6 py-5 md:px-8">
              <h2 className="text-2xl text-ink">{t(titles[g.step][0])}</h2>
              <p className="text-sm font-light opacity-70">{t(titles[g.step][1])}</p>
            </div>
            <div className="p-6 md:p-8">
              {g.step === 0 && (
                <div className="space-y-6">
                  <Select label={t("branchLabel")} placeholder={t("branchPh")} icon={MapPin} value={g.branch} onChange={g.setBranch}
                    options={branches.map((b) => ({ value: b.id, label: pick(b.name) }))} />
                  <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-sand p-1.5">
                    {([["session", "sessions", User], ["package", "giftPackages", Gift]] as const).map(([k, l, Icon]) => (
                      <button key={k} onClick={() => g.changeType(k)} className={`btn !py-3 ${g.type === k ? "bg-olive text-white shadow" : "hover:bg-white/60"}`}><Icon size={16} />{t(l)}</button>))}
                  </div>
                </div>)}
              {g.step === 1 && <Catalog list={g.list} selected={g.itemId} onSelect={g.setItemId} query={g.query} onQuery={g.setQuery} />}
              {g.step === 2 && <GiftForm v={g.form} set={g.patchForm} errors={g.errors} />}
              {g.step === 3 && g.item && <Review item={g.item} v={g.form} branch={g.branch} />}
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-sand/70 px-6 py-4 md:px-8">
              <button className="btn text-olive/80 hover:bg-sand disabled:invisible" disabled={g.step === 0} onClick={g.back}><Backward size={16} />{t("back")}</button>
              {g.item && <span className="font-bold text-ink lg:hidden">{g.item.price} {t("sar")}</span>}
              {g.step < LAST_STEP
                ? <button className="btn-primary" disabled={!g.canNext} onClick={g.next}>{t("next")}<Forward size={16} /></button>
                : <button className="btn-primary" onClick={g.confirm}>{t("confirm")}</button>}
            </div>
          </section>
        </div>
        <Summary item={g.item} branch={g.branch} card={g.form.card} recipient={g.form.recipient} />
      </div>
    </main>
  );
}
