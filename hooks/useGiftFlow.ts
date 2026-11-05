"use client";
import { useMemo, useState } from "react";
import { items, GiftType } from "@/lib/data";
import { validateGift } from "@/lib/validation";
import type { Errors, FormState } from "@/lib/validation";

export const emptyForm: FormState = { sender: "", senderPhone: "", recipient: "", recipientPhone: "", message: "", card: "c1", date: "" };
export const LAST_STEP = 3;

export function useGiftFlow() {
  const [step, setStep] = useState(0);
  const [branch, setBranch] = useState("");
  const [type, setType] = useState<GiftType>("session");
  const [query, setQuery] = useState("");
  const [itemId, setItemId] = useState("");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const list = useMemo(() => items.filter((i) => i.type === type && (i.name + i.desc).includes(query.trim())), [type, query]);
  const item = items.find((i) => i.id === itemId);
  const canNext = step === 0 ? !!branch : step === 1 ? !!item : true;

  const changeType = (t: GiftType) => { setType(t); setItemId(""); };
  const patchForm = (p: Partial<FormState>) => setForm((f) => ({ ...f, ...p }));
  const next = () => {
    if (step === 2) { const e = validateGift(form); setErrors(e); if (Object.keys(e).length) return; }
    setStep((s) => s + 1);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));
  const reset = () => { setDone(false); setStep(0); setForm(emptyForm); setItemId(""); setErrors({}); };

  return {
    step, branch, setBranch, type, changeType, query, setQuery, itemId, setItemId, form, patchForm, errors,
    done, confirm: () => setDone(true), list, item, canNext, next, back, reset
  };
}
