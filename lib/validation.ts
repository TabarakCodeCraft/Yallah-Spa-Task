import type { Key } from "./i18n";
export interface FormState { sender: string; senderPhone: string; recipient: string; recipientPhone: string; message: string; card: string; date: string }
export type Errors = Partial<Record<keyof FormState, Key>>;
const phoneOk = (p: string) => /^05\d{8}$/.test(p);
export function validateGift(f: FormState): Errors {
  const e: Errors = {};
  if (!f.sender.trim()) e.sender = "eSender";
  if (!phoneOk(f.senderPhone)) e.senderPhone = "ePhone";
  if (!f.recipient.trim()) e.recipient = "eRecipient";
  if (!phoneOk(f.recipientPhone)) e.recipientPhone = "ePhone";
  if (!f.date) e.date = "eDate";
  return e;
}
