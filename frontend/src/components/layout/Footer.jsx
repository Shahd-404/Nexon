/* filename: src/components/layout/Footer.jsx */
/* ─────────────────────────────────────────────
   🔻 Minimal Footer (Icons + Copyright only)
   ───────────────────────────────────────────── */

import React from "react";
import { useLang } from "../../context/LangContext.jsx";

const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99h-2.54v-2.89h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.49 1.34 5.02L2 22l5.17-1.35A9.93 9.93 0 0 0 12.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm0 18.1c-1.53 0-3.03-.41-4.34-1.19l-.31-.18-3.07.8.82-2.99-.2-.33a7.88 7.88 0 0 1-1.18-4.21c0-4.38 3.56-7.94 7.94-7.94s7.94 3.56 7.94 7.94s-3.56 7.94-7.94 7.94Zm4.38-5.78c-.24-.12-1.42-.7-1.64-.78s-.38-.12-.54.12c-.16.23-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.01-.37.11-.49.12-.12.24-.28.36-.42.12-.14.16-.23.24-.38.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2.01s.86 2.33.98 2.49c.12.16 1.7 2.6 4.2 3.64.59.25 1.05.4 1.41.51.59.19 1.13.16 1.55.1.47-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
  </svg>
);

export default function Footer() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const year = new Date().getFullYear();

  const socials = [
    {
      icon: <WhatsAppIcon />,
      link: "https://wa.me/201556347892",
      label: "WhatsApp",
    },
    {
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/profile.php?id=61581818982614",
      label: "Facebook",
    },
  ];

  return (
    <footer className="bg-[#111] text-gray-200 border-t border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-5">

        {/* Icons only */}
        <div
          className={`
            flex items-center justify-center gap-5
            ${isAr ? "flex-row-reverse" : ""}
          `}
        >
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="mt-4 text-[11px] text-center text-gray-500">
          © {year} Nexon Laptops — {isAr ? "جميع الحقوق محفوظة" : "All rights reserved"}
        </p>
      </div>
    </footer>
  );
}
