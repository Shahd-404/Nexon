import React, { useMemo, useState } from "react";
import { useLang } from "../../context/LangContext.jsx";

const Row = ({ label, count }) => (
  <label className="flex items-center gap-2 text-sm">
    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
    <span className="flex-1">{label}</span>
    {typeof count === "number" && (
      <span className="text-gray-400 text-xs">({count})</span>
    )}
  </label>
);

const Section = ({ title, children, defaultOpen = true }) => (
  <details open={defaultOpen} className="group border-b border-gray-200 pb-3">
    <summary className="cursor-pointer select-none py-3 font-medium flex items-center justify-between">
      <span>{title}</span>
      <span className="text-gray-500 group-open:rotate-180 transition">▾</span>
    </summary>
    <div className="space-y-2">{children}</div>
  </details>
);

export default function FiltersSidebar({ onClear, onApplyRange }) {
  const { dict } = useLang();
  const [min, setMin] = useState(400);
  const [max, setMax] = useState(1500);

  const ranges = useMemo(
    () => [
      { label: dict.f_under500, min: 0, max: 500 },
      { label: dict.f_500_1000, min: 500, max: 1000 },
      { label: dict.f_1000_1500, min: 1000, max: 1500 },
      { label: dict.f_over1500, min: 1500, max: 100000 },
    ],
    [dict]
  );

  return (
    <aside className="w-full md:w-[280px] rounded-2xl border bg-white p-4 md:p-6 shadow-sm">
      <h4 className="text-base font-semibold mb-3">{dict.f_filters}</h4>

      <button
        onClick={() => {
          onClear?.();
          setMin(400);
          setMax(1500);
        }}
        className="w-full nx-btn border rounded-lg mb-4"
      >
        {dict.f_clear}
      </button>

      <Section title={dict.f_brand}>
        <Row label="Dell" count={24} />
        <Row label="HP" count={18} />
        <Row label="Lenovo" count={30} />
        <Row label="Apple" count={12} />
        <Row label="Acer" count={9} />
        <Row label="Asus" count={15} />
        <Row label="Microsoft" count={7} />
      </Section>

      <Section title={dict.f_cpu}>
        <Row label="Intel Core i5" count={40} />
        <Row label="Intel Core i7" count={35} />
        <Row label="Intel Core i9" count={10} />
        <Row label="AMD Ryzen 5" count={20} />
        <Row label="AMD Ryzen 7" count={15} />
      </Section>

      <Section title="RAM">
        <Row label="8GB" count={50} />
        <Row label="16GB" count={45} />
        <Row label="32GB" count={20} />
      </Section>

      <Section title={dict.f_storage}>
        <Row label="256GB SSD" count={30} />
        <Row label="512GB SSD" count={60} />
        <Row label="1TB SSD" count={25} />
      </Section>

      <Section title={dict.f_condition}>
        <Row label={dict.f_refA} count={70} />
        <Row label={dict.f_refB} count={25} />
        <Row label={dict.f_openBox} count={10} />
      </Section>

      <Section title={dict.f_priceRange}>
        <div className="text-sm text-gray-600 mb-2">${min} - ${max}</div>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={min}
            onChange={(e) => setMin(Math.min(Number(e.target.value), max))}
            className="nx-range"
          />
          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={max}
            onChange={(e) => setMax(Math.max(Number(e.target.value), min))}
            className="nx-range"
          />
        </div>

        <div className="grid gap-2 mt-4">
          {ranges.map((r) => (
            <button
              key={r.label}
              className="w-full nx-btn border rounded-lg"
              onClick={() => {
                setMin(r.min);
                setMax(r.max);
                onApplyRange?.(r.min, r.max);
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </Section>
    </aside>
  );
}
