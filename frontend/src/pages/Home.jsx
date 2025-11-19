/* filename: src/pages/Home.jsx */
/* ─────────────────────────────────────────────────────────────
   🏠 Home / ShopFront
   Sections:
   - hero
   - categories
   - featured (deals)
   - about
   - contact (mailto → nexon122333@gmail.com)
   ──────────────────────────────────────────────────────────── */

import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import productsData from "../data/products.json";

const PRODUCTS = productsData.products || [];

export default function Home() {
  const { lang, dict } = useLang();
  const { addToCart } = useCart();
  const isAr = lang === "ar";

  // ───────────────── Hero texts ─────────────────
  const heroTitle = isAr
    ? "اكتشف قوة الأداء مع لابتوبات الاستيراد المميزة"
    : "Discover high-performance imported laptops";
  const heroSub = isAr
    ? "تسوّق أفضل اللابتوبات المستوردة والمجددة بمعايير عالية الجودة وبأسعار تنافسية تناسب العمل، الألعاب والدراسة."
    : "Shop high-quality imported and refurbished laptops with competitive prices for work, gaming, and study.";
  const heroBtn = isAr ? "تسوّق الآن" : "Shop now";

  // ───────────────── Section titles ─────────────────
  const categoriesTitle = isAr ? "تسوّق حسب الفئة" : "Shop by category";
  const dealsTitle = isAr ? "منتجات مميزة" : "Featured laptops";
  const aboutTitle = isAr ? "عن نيكسون لابتوبس" : "About Nexon Laptops";
  const contactTitle = isAr ? "تواصل معنا" : "Contact us";

  const aboutText = isAr
    ? "نيكسون لابتوبس متجر متخصص في بيع أجهزة اللابتوب المستوردة والمجددة بعناية، نقدم لك أجهزة بأداء ممتاز وضمان موثوق وسعر مناسب. هدفنا هو الجمع بين الجودة والموثوقية لتجربة تسوق مختلفة."
    : "Nexon Laptops is specialized in carefully refurbished and imported laptops, delivering excellent performance, trusted warranty, and fair pricing for a better shopping experience.";

  const categories = isAr
    ? ["لابتوبات الأعمال", "لابتوبات الألعاب", "لابتوبات الطلاب", "العروض المجددة"]
    : ["Business laptops", "Gaming laptops", "Student laptops", "Refurbished deals"];

  // ───────────────── JSX ─────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
      {/* ───────────── Hero ───────────── */}
      <section
        id="hero"
        className="grid md:grid-cols-2 gap-10 items-center pt-4"
      >
        <div
          className={
            isAr ? "order-2 md:order-1 text-right" : "order-2 md:order-1 text-left"
          }
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-snug mb-4">
            {heroTitle}
          </h1>
          <p className="text-sm text-gray-600 mb-6">{heroSub}</p>

          <Link
            to="#featured"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("featured");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="nx-btn nx-btn-dark text-sm"
          >
            {heroBtn}
          </Link>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <div className="w-full max-w-md rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
            <img
              src="/images/1.png"
              alt="Nexon hero laptop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ───────────── Categories ───────────── */}
      <section id="categories" className="space-y-4">
        <h2 className="text-xl font-bold">{categoriesTitle}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className="px-3 py-3 text-xs sm:text-sm rounded-2xl border border-gray-200 hover:bg-gray-50 transition text-center"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ───────────── Featured products (Deals) ───────────── */}
      <section id="featured" className="space-y-4">
        <h2 className="text-xl font-bold">{dealsTitle}</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((p) => (
            <article
              key={p.id}
              className="flex flex-col rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              {/* الصورة */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>

              {/* النصوص */}
              <div className="p-4 space-y-2 flex-1 flex flex-col">
                <h3 className="text-sm font-semibold">
                  {isAr ? p.nameAr || p.name : p.name}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-2">
                  {isAr ? p.shortDescAr : p.shortDescEn}
                </p>

                <div className="mt-auto flex items-center justify-between pt-2 gap-2">
                  <span className="text-sm font-semibold">
                    {dict.priceEGP(p.priceEGP)}
                  </span>

                  <div className="flex gap-2">
                    {/* أضف للسلة */}
                    <button
                      type="button"
                      onClick={() =>
                        addToCart({
                          id: p.id,
                          name: p.name,
                          nameAr: p.nameAr,
                          priceEGP: p.priceEGP,
                          image: p.image,
                        })
                      }
                      className="nx-btn text-xs px-3 py-1.5"
                    >
                      {isAr ? "أضف للسلة" : "Add to cart"}
                    </button>

                    {/* التفاصيل */}
                    <Link
                      to={`/product/${p.id}`}
                      className="nx-btn text-xs px-3 py-1.5"
                    >
                      {isAr ? "التفاصيل" : "Details"}
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ───────────── About ───────────── */}
      <section
        id="about"
        className="grid md:grid-cols-2 gap-8 items-center bg-gray-50 rounded-3xl px-5 py-8"
      >
        <div
          className={
            isAr ? "order-2 md:order-1 text-right" : "order-2 md:order-1 text-left"
          }
        >
          <h2 className="text-xl font-bold mb-3">{aboutTitle}</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{aboutText}</p>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <div className="w-full max-w-sm rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
            <img
              src="/images/4.png"
              alt="About Nexon"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ───────────── Contact ───────────── */}
      <section id="contact" className="space-y-4 pb-16">
        <h2 className="text-xl font-bold text-center mb-4">
          {contactTitle}
        </h2>

        <div className="bg-white rounded-[28px] shadow-[0_40px_80px_rgba(0,0,0,0.06)] max-w-4xl mx-auto px-6 py-8">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const name = data.get("name") || "";
              const email = data.get("email") || "";
              const message = data.get("message") || "";

              const subject = isAr
                ? "استفسار جديد من موقع نيكسون لابتوبس"
                : "New inquiry from Nexon Laptops website";

              const bodyLines = [
                isAr ? `الاسم: ${name}` : `Name: ${name}`,
                isAr ? `البريد الإلكتروني: ${email}` : `Email: ${email}`,
                "",
                isAr ? "نص الرسالة:" : "Message:",
                message,
              ];

              const mailto = `mailto:nexon122333@gmail.com?subject=${encodeURIComponent(
                subject
              )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

              window.location.href = mailto;
              e.currentTarget.reset();
            }}
          >
            {/* Name */}
            <div className="space-y-1 text-sm">
              <input
                type="text"
                name="name"
                required
                placeholder={isAr ? "الاسم" : "Full name"}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Email */}
            <div className="space-y-1 text-sm">
              <input
                type="email"
                name="email"
                required
                placeholder={isAr ? "البريد الإلكتروني" : "Email"}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Message */}
            <div className="space-y-1 text-sm">
              <textarea
                name="message"
                rows={4}
                required
                placeholder={isAr ? "الرسالة" : "Message"}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black resize-none"
              />
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="nx-btn nx-btn-dark text-sm px-8 py-2.5"
              >
                {isAr ? "إرسال" : "Send"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
