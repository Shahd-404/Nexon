/* filename: src/pages/Home.jsx */
/* ─────────────────────────────────────────────────────────────
   🏠 Home Page – Nexon Laptops (AR/EN + EGP)
   ──────────────────────────────────────────────────────────── */

import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext.jsx";

// صور من مجلد public/images
const heroImg = "/images/1.png";
const imgs = [1, 2, 3, 4, 5, 6, 7].map((i) => `/images/${i}.png`);

const products = [
  {
    id: "dell-xps-15",
    name: "Dell XPS 15 (2022)",
    img: imgs[3],
    descAr:
      "معالج Intel Core i7، ذاكرة 16 جيجابايت، قرص SSD سعة 512 جيجابايت، شاشة 15.6 بوصة FHD — مناسب للمصممين والمبرمجين.",
    descEn:
      "Intel Core i7 • 16GB RAM • 512GB SSD • 15.6\" FHD — ideal for creators and developers.",
    priceEGP: 34900,
  },
  {
    id: "lenovo-legion-5-pro",
    name: "Lenovo Legion 5 Pro",
    img: imgs[4],
    descAr:
      "لابتوب ألعاب بأداء قوي مع RTX 3060، شاشة 16\" QHD بتردد 165Hz لتجربة لعب سلسة.",
    descEn:
      "Gaming laptop with RTX 3060 and 16\" QHD 165Hz display for smooth gameplay.",
    priceEGP: 42900,
  },
  {
    id: "macbook-air-m1",
    name: "MacBook Air M1",
    img: imgs[5],
    descAr:
      "خفيف وهادئ مع شريحة Apple M1 وبطارية طويلة — مثالي للطلاب والعمل المتنقل.",
    descEn:
      "Lightweight and silent with Apple M1 chip and long battery life — perfect for students and mobile work.",
    priceEGP: 25900,
  },
  {
    id: "hp-spectre-x360",
    name: "HP Spectre x360",
    img: imgs[6],
    descAr:
      "تصميم قابل للتحويل 2×1 مع شاشة لمس OLED ومعالج i7، مناسب للإبداع والعمل.",
    descEn:
      "2-in-1 convertible with OLED touch display and Intel i7, great for creativity and work.",
    priceEGP: 28900,
  },
  {
    id: "thinkpad-x1-carbon",
    name: "ThinkPad X1 Carbon",
    img: imgs[2],
    descAr:
      "جهاز أعمال فائق الخفة مع جسم كربوني وموثوقية ThinkPad المعروفة.",
    descEn:
      "Ultra-light business laptop with carbon body and legendary ThinkPad reliability.",
    priceEGP: 31500,
  },
  {
    id: "acer-aspire-5",
    name: "Acer Aspire 5",
    img: imgs[1],
    descAr:
      "خيار اقتصادي ممتاز للطلاب والعمل اليومي: i5، 8GB RAM، و512GB SSD.",
    descEn:
      "Great budget option for students and daily work: i5, 8GB RAM, 512GB SSD.",
    priceEGP: 9900,
  },
];

export default function Home() {
  const { dict, lang } = useLang();

  return (
    <div className="pt-16">

      {/* ───────── Hero ───────── */}
      <section id="hero" className="py-14">
        <div className="max-w-7xl mx-auto px-4 grid gap-10 md:grid-cols-12 items-center">
          <div className="md:col-span-7 space-y-4 order-1">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {dict.heroTitle}
            </h1>
            <p className="text-[15px] md:text-base text-gray-600">
              {dict.heroSub}
            </p>
            <div className="pt-2">
              <a href="#featured" className="nx-btn nx-btn-dark">
                {dict.cta}
              </a>
            </div>
          </div>

          <div className="md:col-span-5 order-2">
            <div className="card overflow-hidden">
              <img
                src={heroImg}
                alt="Nexon hero"
                className="w-full h-full object-cover img-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Categories ───────── */}
      <section id="categories" className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {dict.catTitle}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {dict.cats.map((c) => (
              <button
                key={c}
                className="w-full border rounded-xl py-3 text-sm hover:bg-gray-50 transition"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Featured Products ───────── */}
      <section id="featured" className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            {dict.featured}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <article
                key={p.id}
                className="card overflow-hidden hover:shadow-xl transition duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover img-lift"
                  />
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-gray-600">
                    {lang === "ar" ? p.descAr : p.descEn}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-bold">{dict.priceEGP(p.priceEGP)}</span>
                    <Link
                      to={`/product/${p.id}`}
                      className="nx-btn nx-btn-dark"
                    >
                      {dict.details}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── About Section ───────── */}
      <section id="about" className="py-16 section-soft">
        <div className="max-w-7xl mx-auto px-4 grid gap-8 md:grid-cols-12 items-center">
          <div className="md:col-span-5">
            <div className="card overflow-hidden">
              <img
                src={imgs[3]}
                alt="About Nexon"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-7 space-y-3">
            <h3 className="text-2xl md:text-3xl font-bold">
              {dict.aboutTitle}
            </h3>
            <p className="text-[15px] md:text-base text-gray-700">
              {dict.aboutText}
            </p>
          </div>
        </div>
      </section>

      {/* ───────── Contact Section ───────── */}
      <section id="contact" className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            {dict.contact}
          </h3>

          <form className="card p-6 grid gap-4">
            <input className="input" placeholder={dict.name} />
            <input type="email" className="input" placeholder={dict.email} />
            <textarea className="input min-h-32" placeholder={dict.message} />

            <div className="text-center">
              <button type="button" className="nx-btn nx-btn-dark px-6">
                {dict.send}
              </button>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
}
