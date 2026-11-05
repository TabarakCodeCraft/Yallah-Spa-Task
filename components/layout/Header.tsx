"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarCheck, Globe, Mail, Menu, Phone, User, X } from "lucide-react";
import { useI18n } from "../I18nProvider";
import type { Key } from "@/lib/i18n";

const nav: Key[] = ["home", "services", "gifting", "packages", "about"];
const CURRENT: Key = "gifting";
const PHONE = "0125101770";
const EMAIL = "info@yallahspa.com";

function LangSwitch({
  lang,
  toggle,
  tone,
}: {
  lang: string;
  toggle: () => void;
  tone: "dark" | "light";
}) {
  const dark = tone === "dark";
  return (
    <div
      role="group"
      aria-label="Language"
      className={`flex items-center gap-0.5 rounded-full p-0.5 ${dark ? "bg-white/10" : "bg-sand"}`}
    >
      {(["ar", "en"] as const).map((l) => {
        const on = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => !on && toggle()}
            aria-pressed={on}
            className={`rounded-full px-3 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
              on
                ? dark
                  ? "bg-cream text-olive"
                  : "bg-olive text-white"
                : dark
                  ? "text-white/75 hover:text-white"
                  : "text-ink/70 hover:text-ink"
            }`}
          >
            {l === "ar" ? "عربي" : "EN"}
          </button>
        );
      })}
    </div>
  );
}

export default function Header() {
  const { t, lang, toggle } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <div className="hidden bg-olive text-[13px] text-white/80 md:block">
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-5">
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Phone size={14} className="text-gold" />
              <span dir="ltr">{PHONE}</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Mail size={14} className="text-gold" />
              {EMAIL}
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2">
              <Globe size={14} className="text-gold" aria-hidden />
              <LangSwitch lang={lang} toggle={toggle} tone="dark" />
            </span>
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

      <header
        className={`sticky top-0 z-40 border-b bg-cream/95 backdrop-blur transition-shadow ${
          scrolled ? "border-sand shadow-md" : "border-sand/70"
        }`}
      >
        <nav aria-label="Main">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 md:px-6">
            <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
              <Image
                src="/logo.png"
                alt="Yallah Spa"
                width={160}
                height={90}
                priority
                className="h-12 w-auto md:h-14"
              />
            </Link>

            <ul className="hidden items-center gap-9 text-[15px] md:flex">
              {nav.map((k) => {
                const current = k === CURRENT;
                return (
                  <li key={k}>
                    <Link
                      href="#"
                      aria-current={current ? "page" : undefined}
                      className={`relative py-2 transition after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-center after:rounded-full after:bg-gold after:transition-transform hover:text-ink ${
                        current
                          ? "font-bold text-ink after:scale-x-100"
                          : "text-ink/75 after:scale-x-0 hover:after:scale-x-100"
                      }`}
                    >
                      {t(k)}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <Link href="#" className="btn-primary !px-4 !py-2">
                <CalendarCheck size={16} />
                {t("bookNow")}
              </Link>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-xl bg-sand text-ink transition hover:bg-sand/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive/40 md:hidden"
                aria-label="Menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen(!open)}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {open && (
            <div
              id="mobile-menu"
              className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-sand bg-cream px-4 pb-5 pt-3 md:hidden"
            >
              <ul className="space-y-1">
                {nav.map((k) => {
                  const current = k === CURRENT;
                  return (
                    <li key={k}>
                      <Link
                        href="#"
                        onClick={() => setOpen(false)}
                        aria-current={current ? "page" : undefined}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 transition ${
                          current
                            ? "bg-olive/[0.07] font-bold text-ink"
                            : "text-ink/80 hover:bg-sand"
                        }`}
                      >
                        {t(k)}
                        {current && (
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 space-y-4 border-t border-sand pt-4">
                <div className="flex items-center justify-between px-1">
                  <span className="flex items-center gap-2 text-sm text-ink/70">
                    <Globe size={16} className="text-gold" />
                    {t("lang")}
                  </span>
                  <LangSwitch lang={lang} toggle={toggle} tone="light" />
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 px-1 text-sm text-ink/70">
                  <a href={`tel:${PHONE}`} className="flex items-center gap-2">
                    <Phone size={14} className="text-gold" />
                    <span dir="ltr">{PHONE}</span>
                  </a>
                  <Link href="#" className="flex items-center gap-2">
                    <User size={14} className="text-gold" />
                    {t("login")}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
