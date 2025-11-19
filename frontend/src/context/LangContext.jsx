/* ──────────────────────────────────────────────
   File: src/context/LangContext.jsx
   Purpose: Language context (AR/EN) — no duplicates
   ────────────────────────────────────────────── */

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const LangContext = createContext(null);

/* =========================
   Arabic Dictionary (AR)
   ========================= */
const AR = {
  dir: "rtl",
  code: "ar",

  nav: ["الرئيسية", "الفئات", "العروض", "الدعم الفني", "تواصل معنا"],
  logo: "نيكسون لابتوبس",
  search: "ابحث عن لابتوب أو نطاق السعر...",

  heroTitle: "اكتشف قوة لابتوبات الاستيراد",
  heroSub:
    "تسوق أفضل اللابتوبات المستوردة والمجددة بمعايير عالية الجودة وبأسعار منافسة تناسب جميع الاستخدامات  من العمل إلى الألعاب والدراسة.",
  cta: "تسوّق الآن",

  catTitle: "تسوّق حسب الفئة",
  cats: ["لابتوبات الأعمال", "لابتوبات الألعاب", "لابتوبات الطلاب", "العروض المجددة"],
  featured: "منتجات مميزة",

  aboutTitle: "عن نيكسون لابتوبس",
  aboutText:
    "نيكسون لابتوبس هو متجر متخصص في بيع أجهزة اللابتوب المستوردة والمجددة بعناية. نقدم لك أجهزة بأداء ممتاز وضمان موثوق وسعر مناسب. هدفنا هو الجمع بين الجودة والموثوقية لتجربة تسوق مختلفة.",

  contact: "تواصل معنا",
  name: "الاسم",
  email: "البريد الإلكتروني",
  message: "الرسالة",
  send: "إرسال",

  footerLinks: ["الشركة", "الدعم", "الشروط والأحكام"],
  footerCopy: "© 2025 نيكسون لابتوبس — جميع الحقوق محفوظة",

  details: "التفاصيل",
  priceUSD: (v) => `${v}$`,
  priceEGP: (v) => `${v.toLocaleString("ar-EG")} ج.م`,

  // Filters
  f_filters: "الفلاتر",
  f_clear: "إزالة الفلاتر",
  f_brand: "العلامة التجارية",
  f_cpu: "المعالج (CPU)",
  f_storage: "التخزين",
  f_condition: "الحالة",
  f_priceRange: "نطاق السعر",
  f_refA: "مُجدَّد (درجة A)",
  f_refB: "مُجدَّد (درجة B)",
  f_openBox: "صندوق مفتوح",
  f_under500: "أقل من $500",
  f_500_1000: "$500 - $1000",
  f_1000_1500: "$1000 - $1500",
  f_over1500: "أكثر من $1500",
};

/* =========================
   English Dictionary (EN)
   ========================= */
const EN = {
  dir: "ltr",
  code: "en",

  nav: ["Home", "Categories", "Deals", "Support", "Contact"],
  logo: "Nexon Laptops",
  search: "Search for a laptop or price range...",

  // Shorter headline for single-line on md+
  heroTitle: "Discover imported laptops",
  heroSub:
    "Shop top refurbished & imported laptops with high quality standards and competitive pricing from work to gaming and study.",
  cta: "Shop now",

  catTitle: "Shop by Category",
  cats: ["Business Laptops", "Gaming Laptops", "Student Laptops", "Refurbished Deals"],
  featured: "Featured Products",

  aboutTitle: "About Nexon Laptops",
  aboutText:
    "We specialize in imported & refurbished laptops with excellent performance, reliable warranty, and fair prices. Quality and trust for a different shopping experience.",

  contact: "Contact Us",
  name: "Name",
  email: "Email",
  message: "Message",
  send: "Send",

  footerLinks: ["Company", "Support", "Terms & Conditions"],
  footerCopy: "© 2025 Nexon Laptops — All rights reserved",

  details: "Details",
  priceUSD: (v) => `${v}$`,
  priceEGP: (v) => `EGP ${v.toLocaleString("en-EG")}`,

  // Filters
  f_filters: "Filters",
  f_clear: "Clear Filters",
  f_brand: "Brand",
  f_cpu: "Processor (CPU)",
  f_storage: "Storage",
  f_condition: "Condition",
  f_priceRange: "Price Range",
  f_refA: "Refurbished (A Grade)",
  f_refB: "Refurbished (B Grade)",
  f_openBox: "Open Box",
  f_under500: "Under $500",
  f_500_1000: "$500 - $1000",
  f_1000_1500: "$1000 - $1500",
  f_over1500: "Over $1500",
};

/* =========================
   Context Provider
   ========================= */
export function LangProvider({ children }) {
  const [lang, setLang] = useState("ar");
  const dict = useMemo(() => (lang === "ar" ? AR : EN), [lang]);

  // Apply dir/lang on <html>
  useEffect(() => {
    document.documentElement.dir = dict.dir;
    document.documentElement.lang = dict.code;
  }, [dict]);

  const toggle = () => setLang((l) => (l === "ar" ? "en" : "ar"));
  const value = useMemo(() => ({ lang, dict, toggle }), [lang, dict]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

/* =========================
   Hook
   ========================= */
export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within <LangProvider>");
  return ctx;
};
