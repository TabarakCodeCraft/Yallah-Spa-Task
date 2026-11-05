"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CalendarCheck, Globe, Mail, Menu, Phone, User, X } from "lucide-react";
import { useI18n } from "../I18nProvider";
import type { Key } from "@/lib/i18n";

const nav: Key[] = ["home", "services", "gifting", "packages", "about"];

export default function Header() {
  const { t, lang, toggle } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 shadow-sm">
      <div className="hidden bg-olive text-[13px] text-white/85 md:block">
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <a
              href="tel:0125101770"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Phone size={14} className="text-gold" />
              <span dir="ltr">0125101770</span>
            </a>
            <span className="h-3.5 w-px bg-white/20" />
            <a
              href="mailto:info@yallahspa.com"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Mail size={14} className="text-gold" />
              info@yallahspa.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div
              role="group"
              aria-label="Language"
              className="flex items-center gap-1 rounded-full bg-white/10 p-0.5"
            >
              <Globe size={14} className="mx-1.5 text-gold" />
              {(["ar", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => lang !== l && toggle()}
                  aria-pressed={lang === l}
                  className={`rounded-full px-3 py-0.5 text-xs font-medium transition ${lang === l ? "bg-cream text-olive" : "hover:text-white"}`}
                >
                  {l === "ar" ? "عربي" : "EN"}
                </button>
              ))}
            </div>
            <span className="h-3.5 w-px bg-white/20" />
            <Link
              href="#"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <User size={14} className="text-gold" />
              {t("login")}
            </Link>
          </div>
        </div>
      </div>
      <nav
        className="border-b border-sand bg-cream/95 backdrop-blur"
        aria-label="Main"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 md:px-6">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Yallah Spa"
              width={160}
              height={90}
              priority
              className="h-12 w-auto md:h-14"
            />
          </Link>
          <ul className="hidden items-center gap-8 text-[15px] md:flex">
            {nav.map((k) => (
              <li key={k}>
                <Link
                  href="#"
                  className={`transition hover:text-gold ${k === "gifting" ? "font-bold text-ink" : ""}`}
                >
                  {t(k)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Link href="#" className="btn-primary !px-4 !py-2">
              <CalendarCheck size={16} />
              {t("bookNow")}
            </Link>
            <button
              className="grid h-10 w-10 place-items-center rounded-xl bg-sand md:hidden"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {open && (
          <ul className="space-y-1 border-t border-sand px-4 pb-4 md:hidden">
            {nav.map((k) => (
              <li key={k}>
                <Link
                  href="#"
                  className="block rounded-lg px-3 py-3 hover:bg-sand"
                >
                  {t(k)}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={toggle}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-3 hover:bg-sand"
              >
                <Globe size={16} />
                {t("lang")}
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
