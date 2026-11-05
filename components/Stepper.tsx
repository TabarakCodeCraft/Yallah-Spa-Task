"use client";
import { Fragment } from "react";
import { Check, ClipboardCheck, Gift, MapPin, PenLine } from "lucide-react";
import { useI18n } from "./I18nProvider";
import type { Key } from "@/lib/i18n";

const steps: { k: Key; Icon: typeof Gift }[] = [
  { k: "step1", Icon: MapPin },
  { k: "step2", Icon: Gift },
  { k: "step3", Icon: PenLine },
  { k: "step4", Icon: ClipboardCheck },
];

export default function Stepper({ step }: { step: number }) {
  const { t } = useI18n();
  return (
    <ol className="flex items-start">
      {steps.map(({ k, Icon }, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <Fragment key={k}>
            <li
              aria-current={active ? "step" : undefined}
              className="flex w-16 shrink-0 flex-col items-center gap-2 sm:w-24"
            >
              <span
                className={`grid h-10 w-10 place-items-center rounded-full transition ${
                  done
                    ? "bg-olive text-white"
                    : active
                      ? "bg-olive text-white ring-4 ring-olive/15"
                      : "bg-white text-olive/50 ring-1 ring-sand"
                }`}
              >
                {done ? (
                  <Check size={18} strokeWidth={2.5} />
                ) : (
                  <Icon size={18} />
                )}
              </span>
              <span
                className={`text-center text-xs leading-tight sm:text-sm ${
                  active
                    ? "font-semibold text-ink"
                    : done
                      ? "text-ink/80"
                      : "text-ink/50"
                }`}
              >
                {t(k)}
              </span>
            </li>
            {i < steps.length - 1 && (
              <li
                aria-hidden
                className={`mt-[19px] h-0.5 flex-1 rounded-full transition-colors ${
                  i < step ? "bg-olive" : "bg-sand"
                }`}
              />
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}
