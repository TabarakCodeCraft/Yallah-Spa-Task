"use client";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  LucideIcon,
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
const contacts: { Icon: LucideIcon; v: string; href: string }[] = [
  { Icon: Phone, v: "0125101770", href: "tel:0125101770" },
  {
    Icon: MessageCircle,
    v: "+966125101770",
    href: "https://wa.me/966125101770",
  },
  { Icon: Mail, v: "info@yallahspa.com", href: "mailto:info@yallahspa.com" },
];
const socials: { Icon: LucideIcon; label: string }[] = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: Youtube, label: "YouTube" },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60";

function LinkList({
  title,
  rows,
  pick,
}: {
  title: string;
  rows: L[];
  pick: (l: L) => string;
}) {
  return (
    <nav aria-label={title}>
      <h3 className="mb-5 font-bold text-gold">{title}</h3>
      <ul className="space-y-3 text-sm">
        {rows.map((l) => (
          <li key={l.en}>
            <a
              href="#"
              className={`rounded text-white/70 transition hover:text-white ${focusRing}`}
            >
              {pick(l)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  const { t, pick } = useI18n();
  return (
    <footer className="mt-16 bg-olive text-white/80">
      <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-12 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.3fr]">
        <div className="space-y-5 sm:col-span-2 lg:col-span-1">
          <Image
            src="/logo2.png"
            alt="Yallah Spa"
            width={160}
            height={90}
            className="h-16 w-auto"
          />
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            {t("tagline")}
          </p>
          <div className="flex gap-2.5">
            {socials.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className={`grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-gold hover:text-olive ${focusRing}`}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <LinkList title={t("quick")} rows={links} pick={pick} />
        <LinkList title={t("best")} rows={best} pick={pick} />

        <div>
          <h3 className="mb-5 font-bold text-gold">{t("contact")}</h3>
          <ul className="space-y-3.5 text-sm">
            {contacts.map(({ Icon, v, href }) => (
              <li key={v}>
                <a
                  href={href}
                  className={`group flex items-center gap-3 rounded text-white/70 transition hover:text-white ${focusRing}`}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-gold transition group-hover:bg-white/15">
                    <Icon size={15} />
                  </span>
                  <span dir="ltr">{v}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-6 py-5 text-center text-xs text-white/55">
          {t("rights")}
        </p>
      </div>
    </footer>
  );
}
