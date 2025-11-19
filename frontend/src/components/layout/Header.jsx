/* filename: src/components/layout/Header.jsx */
/* ──────────────────────────────────────────────
   🌐 Sticky Glass Header (RTL / LTR)
   - Logo
   - Nav links → sections
   - Search
   - Cart counter
   - Account
   - Lang toggle
   ────────────────────────────────────────────── */

import React from "react";
import { useLang } from "../../context/LangContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15a7.5 7.5 0 0 1 0 15Z"
    />
  </svg>
);

const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M7 4h-2l-1 2v2h2l3.6 7.59l-1.35 2.44A1 1 0 0 0 9 20h11v-2H9.42l1.1-2h7.98a1 1 0 0 0 .92-.62L22 8H6.21"
    />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
    />
  </svg>
);

export default function Header() {
  const { dict, lang, toggle } = useLang();
  const { cart, toggleCart } = useCart();
  const isRTL = dict.dir === "rtl";

  const sectionIds = ["hero", "categories", "featured", "about", "contact"];

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div
        className="
          max-w-7xl mx-auto
          h-16 px-4
          flex items-center justify-between gap-4
          bg-white/70
          backdrop-blur-md
          border-b border-white/60
          shadow-[0_10px_40px_rgba(15,23,42,0.08)]
        "
      >
        {/* Logo */}
        <a
          href="/#hero"
          className={`flex items-center gap-2 shrink-0 ${
            isRTL ? "order-3 md:order-1" : ""
          }`}
        >
          <img
            src="/images/logo.png"
            alt={lang === "ar" ? "شعار نيكسون" : "Nexon logo"}
            className="h-9 md:h-12 lg:h-14 w-auto object-contain"
            loading="eager"
          />
          <span className="sr-only">{dict.logo}</span>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {dict.nav.map((n, idx) => (
            <a
              key={n}
              href={`/#${sectionIds[idx]}`}
              className="opacity-80 hover:opacity-100 transition-colors"
            >
              {n}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 w-[360px] max-w-[46vw]">
            <div className="relative w-full">
              <span className="absolute top-1/2 -translate-y-1/2 end-3 text-gray-500">
                <SearchIcon />
              </span>
              <input
                className="input pe-9"
                placeholder={dict.search}
                aria-label="search"
              />
            </div>
          </div>

          {/* Cart */}
          <button
            onClick={toggleCart}
            className="badge inline-flex items-center gap-1 px-2 py-1 border rounded-md"
            aria-label="cart"
          >
            <CartIcon />
            <span className="text-xs">{cart.length}</span>
          </button>

          {/* Account */}
          <button
            className="badge inline-flex items-center gap-1 px-2 py-1 border rounded-md"
            aria-label="account"
          >
            <UserIcon />
            <span className="text-xs">
              {lang === "ar" ? "حساب" : "Account"}
            </span>
          </button>

          {/* Language toggle */}
          <button
            onClick={toggle}
            className="btn px-3 py-1.5 border rounded-md"
            title={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
          >
            {lang === "ar" ? "En" : "ع"}
          </button>
        </div>
      </div>
    </header>
  );
}
