"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { dict, Key, L, Lang } from "@/lib/i18n";

interface Ctx {
  lang: Lang;
  toggle: () => void;
  t: (k: Key) => string;
  pick: (l: L) => string;
}
const I18n = createContext<Ctx>(null!);
export const useI18n = () => useContext(I18n);

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<Lang>("ar");
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("lang");
    } catch {}
    setLang(
      saved === "en" || saved === "ar"
        ? saved
        : navigator.language.startsWith("ar")
          ? "ar"
          : "en",
    );
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);
  const value: Ctx = {
    lang,
    toggle: () => setLang(lang === "ar" ? "en" : "ar"),
    t: (k) => dict[lang][k],
    pick: (l) => l[lang],
  };
  return <I18n.Provider value={value}>{children}</I18n.Provider>;
}
