"use client";
import { Check, ClipboardCheck, Gift, MapPin, PenLine } from "lucide-react";
import { useI18n } from "./I18nProvider";
import type { Key } from "@/lib/i18n";

const steps: { k: Key; Icon: typeof Gift }[] = [{ k: "step1", Icon: MapPin }, { k: "step2", Icon: Gift }, { k: "step3", Icon: PenLine }, { k: "step4", Icon: ClipboardCheck }];
export default function Stepper({ step }: { step: number }) {
  const { t } = useI18n();
  return (
    <ol className="flex items-start gap-1">
      {steps.map(({ k, Icon }, i) => (
        <li key={k} className="relative flex flex-1 flex-col items-center gap-1.5 text-xs sm:text-sm">
          {i > 0 && <span className={`absolute top-5 -z-0 h-0.5 w-full ltr:right-1/2 rtl:left-1/2 ${i <= step ? "bg-olive" : "bg-sand"}`} />}
          <span className={`relative z-10 grid h-10 w-10 place-items-center rounded-full transition ${i <= step ? "bg-olive text-white" : "bg-sand"}`}>{i < step ? <Check size={18} /> : <Icon size={18} />}</span>
          <span className={i === step ? "font-bold text-ink" : "opacity-60"}>{t(k)}</span>
        </li>))}
    </ol>
  );
}
