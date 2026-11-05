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

function LangSwitch({ lang, toggle }: { lang: string; toggle: () => void }) {
  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-0.5 rounded-full bg-white/10 p-0.5"
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
              on ? "bg-cream text-olive" : "text-white/75 hover:text-white"
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
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

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
              <LangSwitch lang={lang} toggle={toggle} />
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
        className={`sticky top-0 z-40 border-b bg-cream/95 pt-[env(safe-area-inset-top)] backdrop-blur transition-shadow ${
          scrolled || open ? "border-sand shadow-md" : "border-sand/70"
        }`}
      >
        <nav aria-label="Main" className="relative">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3 sm:px-4 md:h-auto md:gap-4 md:px-6 md:py-2">
            <Link href="/" className="shrink-0" onClick={close}>
              <Image
                src="/logo.png"
                alt="Yallah Spa"
                width={160}
                height={90}
                priority
                className="h-11 w-auto md:h-14"
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

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={toggle}
                aria-label="Language"
                className="flex h-10 items-center gap-1.5 rounded-xl bg-sand px-3 text-xs font-semibold text-ink transition active:scale-95 md:hidden"
              >
                <Globe size={15} className="text-olive" />
                {lang === "ar" ? "EN" : "عربي"}
              </button>

              <Link
                href="#"
                aria-label={t("bookNow")}
                className="btn-primary !h-10 !px-3 !py-0 text-sm sm:!px-4 md:!py-2"
              >
                <CalendarCheck size={16} />
                <span className="hidden min-[400px]:inline">
                  {t("bookNow")}
                </span>
              </Link>

              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-xl bg-sand text-ink transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive/40 md:hidden"
                aria-label={t("menu" as Key)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen(!open)}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {open && (
            <>
              <div
                className="fixed inset-0 top-16 z-[-1] bg-ink/40 md:hidden"
                onClick={close}
                aria-hidden
              />
              <div
                id="mobile-menu"
                className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem-env(safe-area-inset-top))] overflow-y-auto overscroll-contain rounded-b-3xl border-t border-sand bg-cream px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 shadow-xl md:hidden"
              >
                <ul className="space-y-1">
                  {nav.map((k) => {
                    const current = k === CURRENT;
                    return (
                      <li key={k}>
                        <Link
                          href="#"
                          onClick={close}
                          aria-current={current ? "page" : undefined}
                          className={`flex min-h-12 items-center justify-between rounded-xl px-4 text-base transition ${
                            current
                              ? "bg-olive/[0.07] font-bold text-ink"
                              : "text-ink/80 active:bg-sand"
                          }`}
                        >
                          {t(k)}
                          {current && (
                            <span className="h-2 w-2 rounded-full bg-gold" />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-4 space-y-3 border-t border-sand pt-4">
                  <Link
                    href="#"
                    onClick={close}
                    className="flex min-h-12 items-center gap-3 rounded-xl bg-white px-4 text-ink ring-1 ring-sand"
                  >
                    <User size={18} className="text-gold" />
                    {t("login")}
                  </Link>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`tel:${PHONE}`}
                      className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-olive text-sm font-medium text-white"
                    >
                      <Phone size={16} />
                      <span dir="ltr">{PHONE}</span>
                    </a>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-sand text-sm font-medium text-ink"
                    >
                      <Mail size={16} className="text-olive" />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
