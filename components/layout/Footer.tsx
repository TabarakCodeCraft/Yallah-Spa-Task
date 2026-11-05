"use client";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";
import { useI18n } from "../I18nProvider";
import type { L } from "@/lib/i18n";

const links: L[] = [
  { ar: "الرئيسية", en: "Home" },
  { ar: "من نحن", en: "About us" },
  { ar: "خدماتنا", en: "Services" },
  { ar: "البكجات", en: "Packages" },
  { ar: "المدونة", en: "Blog" },
];
const best: L[] = [
  { ar: "مساج الاسترخاء 90 د", en: "Relaxation Massage 90 min" },
  { ar: "المساج العلاجي 60 د", en: "Therapeutic Massage 60 min" },
  { ar: "الحمام المغربي", en: "Moroccan Bath" },
  { ar: "تنظيف البشرة", en: "Facial Cleansing" },
];
const contacts = [
  { Icon: Mail, v: "info@yallahspa.com" },
  { Icon: Phone, v: "0125101770" },
  { Icon: MessageCircle, v: "+966125101770" },
];
const socials = [Instagram, Facebook, Youtube];

export default function Footer() {
  const { t, pick } = useI18n();
  const List = ({ title, rows }: { title: string; rows: L[] }) => (
    <div>
      <h3 className="mb-4 font-bold text-gold">{title}</h3>
      <ul className="space-y-2.5 text-sm">
        {rows.map((l) => (
          <li key={l.en}>
            <a href="#" className="transition hover:text-white">
              {pick(l)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <footer className="mt-16 bg-olive text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-4">
        <div className="space-y-4">
          <Image
            src="/logo2.png"
            alt="Yallah Spa"
            width={160}
            height={90}
            className="h-20 px-4 py-2"
          />
          <p className="text-sm leading-relaxed">{t("tagline")}</p>
          <div className="flex gap-2">
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <List title={t("quick")} rows={links} />
        <List title={t("best")} rows={best} />
        <div>
          <h3 className="mb-4 font-bold text-gold">{t("contact")}</h3>
          <ul className="space-y-3 text-sm">
            {contacts.map(({ Icon, v }) => (
              <li key={v} className="flex items-center gap-2.5">
                <Icon size={16} className="text-gold" />
                <span dir="ltr">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        {t("rights")}
      </p>
    </footer>
  );
}
