"use client";
import { useId } from "react";
import { Gift, LucideIcon, Phone, User } from "lucide-react";
import Field from "./Field";
import { useI18n } from "./I18nProvider";
import CardPicker from "./ui/CardPicker";
import DatePicker from "./ui/DatePicker";
import type { Errors, FormState } from "@/lib/validation";

const MAX = 200;
interface Props {
  v: FormState;
  set: (p: Partial<FormState>) => void;
  errors: Errors;
}

function Group({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-4 rounded-2xl border border-sand bg-cream/40 p-5">
      <legend className="sr-only">{title}</legend>
      <div
        aria-hidden
        className="flex items-center gap-2.5 font-semibold text-ink"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gold/15 text-gold">
          <Icon size={16} />
        </span>
        {title}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export default function GiftForm({ v, set, errors }: Props) {
  const { t } = useI18n();
  const msgId = useId();
  const err = (k: keyof FormState) => (errors[k] ? t(errors[k]!) : undefined);
  const nearLimit = v.message.length >= MAX * 0.9;

  return (
    <div className="space-y-6">
      <Group icon={User} title={t("from")}>
        <Field label={t("sender")} icon={User} error={err("sender")}>
          <input
            className="input ps-11"
            autoComplete="name"
            value={v.sender}
            onChange={(e) => set({ sender: e.target.value })}
          />
        </Field>
        <Field label={t("senderPhone")} icon={Phone} error={err("senderPhone")}>
          <input
            dir="ltr"
            inputMode="tel"
            autoComplete="tel"
            className="input ps-11 text-start"
            placeholder="05xxxxxxxx"
            value={v.senderPhone}
            onChange={(e) => set({ senderPhone: e.target.value })}
          />
        </Field>
      </Group>

      <Group icon={Gift} title={t("to")}>
        <Field label={t("recipient")} icon={User} error={err("recipient")}>
          <input
            className="input ps-11"
            value={v.recipient}
            onChange={(e) => set({ recipient: e.target.value })}
          />
        </Field>
        <Field
          label={t("recipientPhone")}
          icon={Phone}
          error={err("recipientPhone")}
        >
          <input
            dir="ltr"
            inputMode="tel"
            className="input ps-11 text-start"
            placeholder="05xxxxxxxx"
            value={v.recipientPhone}
            onChange={(e) => set({ recipientPhone: e.target.value })}
          />
        </Field>
      </Group>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-sm">
          <label htmlFor={msgId} className="font-medium text-ink">
            {t("message")}
          </label>
          <span
            dir="ltr"
            className={`tabular-nums ${nearLimit ? "font-medium text-gold" : "opacity-50"}`}
          >
            {v.message.length}/{MAX}
          </span>
        </div>
        <textarea
          id={msgId}
          className="input h-28 resize-none"
          maxLength={MAX}
          value={v.message}
          onChange={(e) => set({ message: e.target.value })}
        />
      </div>

      <CardPicker
        label={t("cardDesign")}
        value={v.card}
        onChange={(card) => set({ card })}
      />
      <DatePicker
        label={t("date")}
        value={v.date}
        onChange={(date) => set({ date })}
        error={err("date")}
      />
    </div>
  );
}
