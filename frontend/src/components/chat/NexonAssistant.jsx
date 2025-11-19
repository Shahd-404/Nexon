/* filename: src/components/chat/NexonAssistant.jsx */
/* ─────────────────────────────────────────────────────────────
   💬 Nexon Assistant – Data-driven chatbot
   - Reads products from JSON
   - Reads bot knowledge (intents) from JSON
   - Can:
     • greet / answer "who are you" / "what do you sell"
     • list available laptops
     • show full info + image for a specific laptop
   ──────────────────────────────────────────────────────────── */
import React, { useState } from "react";
import { useLang } from "../../context/LangContext.jsx";
import botData from "../../data/botKnowledge.json";
import productsData from "../../data/products.json";

const ALL_PRODUCTS = productsData.products || [];

function normalize(text) {
  if (!text) return "";
  return text.toString().toLowerCase();
}

// يحدد إذا الرسالة عربي بناء على وجود حروف عربية
function isArabic(text) {
  return /[\u0600-\u06FF]/.test(text);
}

// يبحث عن منتج بالاسم أو التاجز
function findProductByMessage(message) {
  const msg = normalize(message);

  for (const p of ALL_PRODUCTS) {
    const allNames = [
      p.id,
      p.name,
      p.nameAr,
      ...(p.tags || [])
    ].filter(Boolean);

    for (const n of allNames) {
      if (msg.includes(normalize(n))) {
        return p;
      }
    }
  }
  return null;
}

// يحاول يحدد Intent حسب الـpatterns
function matchIntent(message, lang) {
  const msg = normalize(message);
  const intents = botData.intents || [];

  for (const intent of intents) {
    const patterns =
      lang === "ar" ? intent.patternsAr || [] : intent.patternsEn || [];
    for (const pat of patterns) {
      if (pat && msg.includes(normalize(pat))) {
        return intent;
      }
    }
  }
  return null;
}

export default function NexonAssistant() {
  const { lang, dict } = useLang();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => {
    const ar = isArabic(lang === "ar" ? "ا" : "");
    const welcomeAr =
      "مرحبًا! أنا مساعد نيكسون. اسألني عن أي لابتوب، الأسعار، أو الاستخدام المناسب (أعمال، ألعاب، طلاب).";
    const welcomeEn =
      "Hi! I'm Nexon Assistant. Ask me about any laptop, prices, or which model fits your usage (business, gaming, student).";

    return [
      {
        id: "welcome-1",
        from: "bot",
        type: "text",
        text: lang === "ar" ? welcomeAr : welcomeEn
      }
    ];
  });

  const isAr = lang === "ar";

  const title = "Nexon Assistant";
  const subtitle = isAr
    ? "اسأل عن المواصفات، السعر أو التوافر."
    : "Ask about specs, price, or availability.";

  const placeholder = isAr
    ? "اكتب سؤالك… مثلاً: عايزة Legion 5 للألعاب"
    : "Type your question… e.g. I want Legion 5 for gaming";

  const sendLabel = isAr ? "إرسال" : "Send";

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), ...msg }]);
  };

  const handleBotReply = (userText) => {
    const langNow = isArabic(userText) ? "ar" : lang;

    // 1) هل ذكر اسم لابتوب معيّن؟
    const product = findProductByMessage(userText);
    if (product) {
      const text =
        langNow === "ar"
          ? `${product.nameAr || product.name}\n\n${product.shortDescAr}\n\nالسعر: ${dict.priceEGP(
              product.priceEGP
            )}`
          : `${product.name}\n\n${product.shortDescEn}\n\nPrice: ${dict.priceEGP(
              product.priceEGP
            )}`;

      addMessage({
        from: "bot",
        type: "product",
        product,
        text
      });
      return;
    }

    // 2) Intent عام (greeting / who-are-you / what-do-you-sell / list-products... إلخ)
    const intent = matchIntent(userText, langNow);
    if (intent) {
      if (intent.id === "list-products") {
        const base =
          langNow === "ar"
            ? intent.responsesAr[0] || ""
            : intent.responsesEn[0] || "";

        const listLines = ALL_PRODUCTS.map((p) =>
          langNow === "ar"
            ? `• ${p.nameAr || p.name} — ${dict.priceEGP(p.priceEGP)}`
            : `• ${p.name} — ${dict.priceEGP(p.priceEGP)}`
        );

        addMessage({
          from: "bot",
          type: "text",
          text: `${base}\n${listLines.join("\n")}\n\n${
            langNow === "ar"
              ? "اكتب اسم أي موديل منهم عشان أطلع لك التفاصيل كاملة."
              : "Type the name of any model to see full details."
          }`
        });
        return;
      }

      const responses =
        langNow === "ar" ? intent.responsesAr || [] : intent.responsesEn || [];
      const reply =
        responses[Math.floor(Math.random() * responses.length)] ||
        (langNow === "ar"
          ? "حاضر، تحت أمرك."
          : "Sure, I'm here to help.");

      addMessage({ from: "bot", type: "text", text: reply });
      return;
    }

    // 3) fallback
    const fallback =
      langNow === "ar"
        ? botData.fallback.responseAr
        : botData.fallback.responseEn;

    addMessage({ from: "bot", type: "text", text: fallback });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;

    addMessage({ from: "user", type: "text", text: value });
    setInput("");
    handleBotReply(value);
  };

  // quick actions تبعت أسئلة جاهزة
  const quickActions = isAr
    ? [
        "ايه اللابتوبات المتاحة عندكو؟",
        "عايزة لابتوب للألعاب.",
        "ايه هو Lenovo Legion 5 Pro؟",
        "مين انت؟"
      ]
    : [
        "What laptops are available?",
        "I want a gaming laptop.",
        "What is Dell XPS 15?",
        "Who are you?"
      ];

  return (
    <>
      {/* زر الفقاعة العائم */}
      <button
        type="button"
        aria-label="Open Nexon Assistant"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-11 h-11 rounded-full bg-black text-white shadow-lg hover:scale-105 transition"
      >
        <span className="text-lg leading-none">💬</span>
      </button>

      {/* نافذة الشات */}
      {open && (
        <div className="fixed bottom-20 right-6 z-40 w-[360px] max-w-[calc(100%-2rem)]">
          <div className="rounded-2xl shadow-2xl bg-white border border-gray-200 overflow-hidden">
            {/* الهيدر */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-black text-white">
              <div>
                <div className="text-sm font-semibold">{title}</div>
                <div className="text-[11px] opacity-80">{subtitle}</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg白/20 text-xs"
              >
                ×
              </button>
            </div>

            {/* الرسائل */}
            <div className="px-4 py-3 space-y-3 text-[13px] max-h-80 overflow-y-auto">
              {messages.map((msg) => {
                if (msg.from === "user") {
                  return (
                    <div key={msg.id} className="flex justify-end">
                      <div className="inline-flex max-w-[85%] rounded-2xl bg-black text-white px-3 py-2 text-[12px]">
                        <span>{msg.text}</span>
                      </div>
                    </div>
                  );
                }

                // رسائل البوت
                if (msg.type === "product" && msg.product) {
                  const p = msg.product;
                  return (
                    <div
                      key={msg.id}
                      className="inline-flex max-w-[85%] rounded-2xl bg-gray-50 px-3 py-2 text-gray-800 text-[12px] flex-col gap-2"
                    >
                      <div className="flex gap-2 items-center">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-md object-cover border"
                        />
                        <div>
                          <div className="font-semibold text-[12px]">
                            {lang === "ar" ? p.nameAr || p.name : p.name}
                          </div>
                          <div className="text-[11px] text-gray-600">
                            {dict.priceEGP(p.priceEGP)}
                          </div>
                        </div>
                      </div>
                      <div className="whitespace-pre-line">{msg.text}</div>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className="inline-flex max-w-[85%] rounded-2xl bg-gray-50 px-3 py-2 text-gray-800 text-[12px]"
                  >
                    <span className="whitespace-pre-line">{msg.text}</span>
                  </div>
                );
              })}

              {/* الأزرار السريعة */}
              <div className="flex flex-wrap gap-2 pt-1">
                {quickActions.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      setInput(label);
                      addMessage({
                        from: "user",
                        type: "text",
                        text: label
                      });
                      handleBotReply(label);
                    }}
                    className="px-3 py-1 rounded-full border border-gray-300 text-[11px] hover:bg-gray-100 transition"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* إدخال الرسالة */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-3 py-3 border-t border-gray-200 bg-gray-50"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                className="flex-1 text-[12px] px-3 py-2 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button
                type="submit"
                className="nx-btn nx-btn-dark text-[12px] px-3 py-2"
              >
                {sendLabel}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
