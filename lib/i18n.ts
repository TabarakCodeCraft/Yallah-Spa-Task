export type Lang = "ar" | "en";
export type L = Record<Lang, string>;
const ar = {
  home: "الرئيسية", services: "خدماتنا", gifting: "الإهداء", packages: "البكجات", about: "من نحن", login: "تسجيل الدخول", bookNow: "احجز الآن",
  heroTitle: "إهداء باقات وجلسات يلا سبا", heroDesc: "اهدِ من تحب تجربة استرخاء مميزة، واختر من جلساتنا وباقاتنا بطاقة إهداء رقمية تصلهم عبر واتساب.",
  h1t: "اختر", h1d: "جلسة أو باقة تناسب من تحب", h2t: "خصّص", h2d: "أضف رسالتك وصمم بطاقتك", h3t: "أرسل", h3d: "بطاقة رقمية تصل عبر واتساب",
  step1: "الموقع والنوع", step2: "الهدية", step3: "التفاصيل", step4: "المراجعة",
  branchLabel: "فرع المستفيد", branchPh: "الرجاء تحديد الفرع", sessions: "جلسات فردية", giftPackages: "باقات الإهداء",
  search: "ابحث عن جلسة أو باقة...", noResults: "لا توجد نتائج مطابقة لبحثك",
  sender: "اسم المُهدي", senderPhone: "جوال المُهدي", recipient: "اسم المُهدى إليه", recipientPhone: "جوال المُهدى إليه (واتساب)",
  message: "رسالتك الشخصية", cardDesign: "تصميم البطاقة", date: "تاريخ التسليم",
  eSender: "الرجاء إدخال اسمك", ePhone: "رقم جوال غير صحيح (05xxxxxxxx)", eRecipient: "الرجاء إدخال اسم المستلم", eDate: "اختر تاريخ التسليم",
  summary: "ملخص الهدية", branch: "الفرع", gift: "الهدية", total: "الإجمالي", sar: "ر.س", giftCard: "بطاقة إهداء", to: "إلى", from: "من",
  back: "رجوع", next: "التالي", confirm: "تأكيد الإهداء", okTitle: "تم تجهيز هديتك!", okDesc: "سيتم إرسال الهدية إلى", on: "بتاريخ", newGift: "إهداء جديد",
  defaultMsg: "هدية من القلب", tagline: "يلا سبا… وجهتك المفضلة للعناية بجسمك وروحك", quick: "روابط سريعة", best: "الأكثر مبيعاً", contact: "تواصل معنا",
  rights: "© 2026 يلا سبا. جميع الحقوق محفوظة", title1: "أين تودّ إرسال الهدية؟", desc1: "اختر الفرع ونوع الهدية للبدء", title2: "اختر هديتك", desc2: "جلسات وباقات منتقاة بعناية", title3: "خصّص بطاقتك", desc3: "أضف تفاصيل المُهدي والمُهدى إليه ورسالتك", title4: "راجع هديتك", desc4: "تأكد من التفاصيل قبل التأكيد", today: "اليوم", tomorrow: "غدًا", pickDate: "اختر التاريخ",
  lang: "English",
};
const en: typeof ar = {
  home: "Home", services: "Services", gifting: "Gifting", packages: "Packages", about: "About us", login: "Log in", bookNow: "Book now",
  heroTitle: "Gift Yallah Spa Sessions & Packages", heroDesc: "Give your loved ones a moment of calm. Pick a session or package and send a digital gift card via WhatsApp.",
  h1t: "Choose", h1d: "A session or package they will love", h2t: "Personalize", h2d: "Add your message and pick a card", h3t: "Send", h3d: "A digital card delivered on WhatsApp",
  step1: "Location", step2: "Gift", step3: "Details", step4: "Review",
  branchLabel: "Recipient's branch", branchPh: "Select a branch", sessions: "Single sessions", giftPackages: "Gift packages",
  search: "Search sessions or packages...", noResults: "No results match your search",
  sender: "Your name", senderPhone: "Your mobile", recipient: "Recipient's name", recipientPhone: "Recipient's mobile (WhatsApp)",
  message: "Personal message", cardDesign: "Card design", date: "Delivery date",
  eSender: "Please enter your name", ePhone: "Invalid mobile number (05xxxxxxxx)", eRecipient: "Please enter the recipient's name", eDate: "Select a delivery date",
  summary: "Gift summary", branch: "Branch", gift: "Gift", total: "Total", sar: "SAR", giftCard: "Gift card", to: "To", from: "From",
  back: "Back", next: "Next", confirm: "Confirm gift", okTitle: "Your gift is ready!", okDesc: "The gift will be sent to", on: "on", newGift: "New gift",
  defaultMsg: "A gift from the heart", tagline: "Yallah Spa… your favorite destination to care for body and soul", quick: "Quick links", best: "Best sellers", contact: "Contact us",
  rights: "© 2026 Yallah Spa. All rights reserved", title1: "Where should we send it?", desc1: "Choose a branch and gift type to begin", title2: "Pick your gift", desc2: "Carefully curated sessions and packages", title3: "Personalize your card", desc3: "Add sender and recipient details and your message", title4: "Review your gift", desc4: "Double-check the details before confirming", today: "Today", tomorrow: "Tomorrow", pickDate: "Pick a date",
  lang: "العربية",
};
export const dict = { ar, en };
export type Key = keyof typeof ar;
