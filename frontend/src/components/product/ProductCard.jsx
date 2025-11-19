/* filename: src/components/product/ProductCard.jsx */
/* ─────────────────────────────────────────────────────────────
   💳 ProductCard
   - Brand / Title / Specs / Price
   - Strict b/w, soft shadow
   ──────────────────────────────────────────────────────────── */
export default function ProductCard({ product }) {
  const { title, brand, price, specs, images } = product;
  return (
    <article className="card p-4 hover:shadow-md transition">
      <div className="aspect-[4/3] bg-[#f7f7f7] border border-line rounded-xl2 mb-3 overflow-hidden">
        {/* Placeholder image */}
        {images?.[0] ? (
          <img src={images[0]} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-sm opacity-60">No Image</div>
        )}
      </div>

      <div className="flex items-center justify-between mb-1">
        <h3 className="font-medium">{brand} — {title}</h3>
        <span className="text-sm font-semibold">{price?.toLocaleString()} EGP</span>
      </div>

      <p className="text-sm opacity-80">
        {specs?.cpu} • {specs?.ram} • {specs?.storage} • {specs?.gpu}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <button className="text-sm underline">Details</button>
        <button className="text-sm underline">Compare</button>
      </div>
    </article>
  );
}
