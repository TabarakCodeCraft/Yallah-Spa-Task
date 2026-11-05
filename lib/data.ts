import { Droplets, Flame, Flower2, Heart, Sparkles, LucideIcon } from "lucide-react";
import type { L } from "./i18n";
export type GiftType = "session" | "package";
export interface Item { id: string; type: GiftType; name: L; desc: L; duration: L; price: number; icon: LucideIcon }
export const branches: { id: string; name: L }[] = [
  {
    id: "makkah",
    name: { ar: "مكة (خدمات منزلية)", en: "Makkah (Home services)" },
  },
  {
    id: "riyadh",
    name: { ar: "الرياض (خدمات منزلية)", en: "Riyadh (Home services)" },
  },
  {
    id: "jeddah",
    name: { ar: "جدة (خدمات منزلية)", en: "Jeddah (Home services)" },
  },
  {
    id: "awali",
    name: {
      ar: "فرع العوالي (خدمات في المركز)",
      en: "Al Awali Branch (In-center services)",
    },
  },
];
export const items: Item[] = [
  { id: "s1", type: "session", icon: Flower2, price: 350, name: { ar: "مساج استرخاء", en: "Relaxation Massage" }, desc: { ar: "جلسة مساج سويدي بزيوت عطرية", en: "Swedish massage with aromatic oils" }, duration: { ar: "60 دقيقة", en: "60 min" } },
  { id: "s2", type: "session", icon: Droplets, price: 420, name: { ar: "حمام مغربي", en: "Moroccan Bath" }, desc: { ar: "تقشير وترطيب عميق للبشرة", en: "Deep exfoliation and hydration" }, duration: { ar: "90 دقيقة", en: "90 min" } },
  { id: "s3", type: "session", icon: Sparkles, price: 280, name: { ar: "عناية بالوجه", en: "Facial Treatment" }, desc: { ar: "تنظيف عميق مع ماسك مغذٍ", en: "Deep cleanse with a nourishing mask" }, duration: { ar: "45 دقيقة", en: "45 min" } },
  { id: "p1", type: "package", icon: Heart, price: 990, name: { ar: "باقة العروس", en: "Bridal Package" }, desc: { ar: "حمام مغربي + مساج + عناية بالوجه", en: "Moroccan bath + massage + facial" }, duration: { ar: "4 ساعات", en: "4 hours" } },
  { id: "p2", type: "package", icon: Flame, price: 650, name: { ar: "باقة الاسترخاء", en: "Relax Package" }, desc: { ar: "مساج + جاكوزي + مشروب ترحيبي", en: "Massage + jacuzzi + welcome drink" }, duration: { ar: "2.5 ساعة", en: "2.5 hours" } },
];
export const cards: { id: string; name: L; cls: string }[] = [
  { id: "c1", name: { ar: "ذهبي", en: "Gold" }, cls: "from-[#F6EBCB] to-[#E3C98A]" },
  { id: "c2", name: { ar: "أخضر", en: "Mint" }, cls: "from-[#E4F1EA] to-[#A9CDBA]" },
  { id: "c3", name: { ar: "وردي", en: "Rose" }, cls: "from-[#FBE9EA] to-[#E8B7BF]" },
];
