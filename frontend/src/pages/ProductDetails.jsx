// filename: src/pages/ProductDetails.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLang } from "../context/LangContext.jsx";

// كل المنتجات (نفس الـ IDs المستخدمة في Home.jsx)
const products = [
  {
    id: "dell-xps-15",
    name: "Dell XPS 15 (2022)",
    mainImg: "/images/4.png",
    gallery: ["/images/4.png", "/images/1.png", "/images/2.png", "/images/3.png"],
    specs: [
      { key: "cpu", labelAr: "المعالج", labelEn: "Processor", value: "Intel Core i7-11800H" },
      { key: "gpu", labelAr: "الرسومات", labelEn: "Graphics", value: "NVIDIA GeForce RTX 3050" },
      { key: "ram", labelAr: "الذاكرة", labelEn: "RAM", value: "16GB DDR4" },
      { key: "storage", labelAr: "التخزين", labelEn: "Storage", value: "512GB NVMe PCIe Gen4 SSD" },
      { key: "display", labelAr: "الشاشة", labelEn: "Display", value: '15.6" FHD (1920x1080) IPS' },
      { key: "os", labelAr: "نظام التشغيل", labelEn: "Operating System", value: "Windows 11 Pro" },
      { key: "battery", labelAr: "البطارية", labelEn: "Battery", value: "60Wh – حتى 8 ساعات" },
      { key: "weight", labelAr: "الوزن", labelEn: "Weight", value: "1.9 كجم" },
      { key: "color", labelAr: "اللون", labelEn: "Color", value: "فضي / Space Gray" },
    ],
    descAr:
      "تم تصميم Dell XPS 15 للأداء الفائق والإنتاجية القصوى، بمعالج Intel Core i7 وبطاقة RTX 3050. شاشة 15.6 بوصة تمنحك تجربة مشاهدة مذهلة، وهي مثالية للمحترفين والمبدعين.",
    descEn:
      "Dell XPS 15 (2022) is engineered for peak performance and productivity with Intel Core i7 and RTX 3050 graphics, ideal for creators and professionals.",
    priceEGP: 34900,
  },
  {
    id: "lenovo-legion-5-pro",
    name: "Lenovo Legion 5 Pro",
    mainImg: "/images/5.png",
    gallery: ["/images/5.png", "/images/2.png", "/images/3.png", "/images/1.png"],
    specs: [
      { key: "cpu", labelAr: "المعالج", labelEn: "Processor", value: "AMD Ryzen 7 5800H" },
      { key: "gpu", labelAr: "الرسومات", labelEn: "Graphics", value: "NVIDIA GeForce RTX 3060" },
      { key: "ram", labelAr: "الذاكرة", labelEn: "RAM", value: "16GB DDR4" },
      { key: "storage", labelAr: "التخزين", labelEn: "Storage", value: "1TB NVMe SSD" },
      { key: "display", labelAr: "الشاشة", labelEn: "Display", value: '16" QHD (2560x1600) 165Hz' },
      { key: "os", labelAr: "نظام التشغيل", labelEn: "Operating System", value: "Windows 11" },
      { key: "battery", labelAr: "البطارية", labelEn: "Battery", value: "80Wh – حتى 9 ساعات" },
      { key: "weight", labelAr: "الوزن", labelEn: "Weight", value: "2.4 كجم" },
      { key: "color", labelAr: "اللون", labelEn: "Color", value: "رمادي داكن" },
    ],
    descAr:
      "يمنحك Lenovo Legion 5 Pro أداء ألعاب احترافي بفضل بطاقة RTX 3060 وشاشة QHD بسرعة 165Hz، لتجربة لعب سلسة وغامرة.",
    descEn:
      "Lenovo Legion 5 Pro delivers high-end gaming power with RTX 3060 graphics and a QHD 165Hz display for smooth, immersive gameplay.",
    priceEGP: 42900,
  },
  {
    id: "macbook-air-m1",
    name: "MacBook Air M1",
    mainImg: "/images/6.png",
    gallery: ["/images/6.png", "/images/3.png", "/images/1.png", "/images/4.png"],
    specs: [
      { key: "cpu", labelAr: "المعالج", labelEn: "Processor", value: "Apple M1" },
      { key: "ram", labelAr: "الذاكرة", labelEn: "RAM", value: "8GB Unified Memory" },
      { key: "storage", labelAr: "التخزين", labelEn: "Storage", value: "256GB SSD" },
      { key: "display", labelAr: "الشاشة", labelEn: "Display", value: '13.3" Retina Display' },
      { key: "os", labelAr: "نظام التشغيل", labelEn: "Operating System", value: "macOS" },
      { key: "battery", labelAr: "البطارية", labelEn: "Battery", value: "حتى 15 ساعة تشغيل" },
      { key: "weight", labelAr: "الوزن", labelEn: "Weight", value: "1.29 كجم" },
      { key: "color", labelAr: "اللون", labelEn: "Color", value: "رمادي فلكي (Space Gray)" },
    ],
    descAr:
      "يُعتبر MacBook Air M1 من أنحف الأجهزة في العالم، يجمع بين القوة والهدوء والبطارية الطويلة، مثالي للطلاب والمصممين.",
    descEn:
      "MacBook Air M1 combines powerful performance, silent operation and long battery life — ideal for students and creatives.",
    priceEGP: 25900,
  },
  {
    id: "hp-spectre-x360",
    name: "HP Spectre x360",
    mainImg: "/images/7.png",
    gallery: ["/images/7.png", "/images/1.png", "/images/2.png", "/images/5.png"],
    specs: [
      { key: "cpu", labelAr: "المعالج", labelEn: "Processor", value: "Intel Core i7 (11th Gen)" },
      { key: "gpu", labelAr: "الرسومات", labelEn: "Graphics", value: "Intel Iris Xe" },
      { key: "ram", labelAr: "الذاكرة", labelEn: "RAM", value: "16GB LPDDR4x" },
      { key: "storage", labelAr: "التخزين", labelEn: "Storage", value: "512GB SSD" },
      { key: "display", labelAr: "الشاشة", labelEn: "Display", value: '13.5" OLED Touch 3:2' },
      { key: "os", labelAr: "نظام التشغيل", labelEn: "Operating System", value: "Windows 11" },
      { key: "battery", labelAr: "البطارية", labelEn: "Battery", value: "حتى 12 ساعة عمل" },
      { key: "weight", labelAr: "الوزن", labelEn: "Weight", value: "1.3 كجم" },
      { key: "color", labelAr: "اللون", labelEn: "Color", value: "أزرق داكن / Dark Blue" },
    ],
    descAr:
      "HP Spectre x360 جهاز 2×1 قابل للتحويل بتصميم فاخر وشاشة OLED تعمل باللمس، مثالي للمبدعين والعمل الإنتاجي اليومي.",
    descEn:
      "HP Spectre x360 is a premium 2-in-1 convertible with an OLED touch display, perfect for creators and everyday productivity.",
    priceEGP: 28900,
  },
  {
    id: "thinkpad-x1-carbon",
    name: "ThinkPad X1 Carbon",
    mainImg: "/images/3.png",
    gallery: ["/images/3.png", "/images/1.png", "/images/4.png", "/images/6.png"],
    specs: [
      { key: "cpu", labelAr: "المعالج", labelEn: "Processor", value: "Intel Core i7 (10th/11th Gen)" },
      { key: "ram", labelAr: "الذاكرة", labelEn: "RAM", value: "16GB" },
      { key: "storage", labelAr: "التخزين", labelEn: "Storage", value: "512GB SSD" },
      { key: "display", labelAr: "الشاشة", labelEn: "Display", value: '14" FHD / QHD' },
      { key: "os", labelAr: "نظام التشغيل", labelEn: "Operating System", value: "Windows 10/11 Pro" },
      { key: "battery", labelAr: "البطارية", labelEn: "Battery", value: "حتى 15 ساعة" },
      { key: "weight", labelAr: "الوزن", labelEn: "Weight", value: "1.1 كجم تقريبًا" },
      { key: "color", labelAr: "اللون", labelEn: "Color", value: "أسود (ThinkPad Black)" },
    ],
    descAr:
      "ThinkPad X1 Carbon جهاز أعمال فائق الخفة من لينوفو مع جودة تصنيع عالية ولوحة مفاتيح مريحة، مثالي لرجال الأعمال والتنقل.",
    descEn:
      "ThinkPad X1 Carbon is an ultra-light business laptop with premium build quality and a great keyboard, ideal for professionals on the go.",
    priceEGP: 31500,
  },
  {
    id: "acer-aspire-5",
    name: "Acer Aspire 5",
    mainImg: "/images/2.png",
    gallery: ["/images/2.png", "/images/1.png", "/images/3.png", "/images/4.png"],
    specs: [
      { key: "cpu", labelAr: "المعالج", labelEn: "Processor", value: "Intel Core i5" },
      { key: "ram", labelAr: "الذاكرة", labelEn: "RAM", value: "8GB DDR4" },
      { key: "storage", labelAr: "التخزين", labelEn: "Storage", value: "512GB SSD" },
      { key: "display", labelAr: "الشاشة", labelEn: "Display", value: '15.6" FHD (1920x1080)' },
      { key: "os", labelAr: "نظام التشغيل", labelEn: "Operating System", value: "Windows 11" },
      { key: "battery", labelAr: "البطارية", labelEn: "Battery", value: "حتى 8 ساعات استخدام" },
      { key: "weight", labelAr: "الوزن", labelEn: "Weight", value: "1.8 كجم تقريبًا" },
      { key: "color", labelAr: "اللون", labelEn: "Color", value: "فضي" },
    ],
    descAr:
      "Acer Aspire 5 خيار اقتصادي ممتاز للطلاب والعمل اليومي مع أداء ثابت وسعة تخزين سريعة.",
    descEn:
      "Acer Aspire 5 is a great budget option for students and daily work with solid performance and fast storage.",
    priceEGP: 9900,
  },
];

export default function ProductDetails() {
  const { id } = useParams();
  const { dict, lang } = useLang();

  const product = products.find((p) => p.id === id);

  // في حالة حد فتح لينك غلط
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">
          {lang === "ar" ? "المنتج غير موجود" : "Product not found"}
        </h2>
      </div>
    );
  }

  const [activeImg, setActiveImg] = useState(product.mainImg);

  const specsTitle = lang === "ar" ? "المواصفات" : "Specifications";
  const aboutTitle = lang === "ar" ? "عن الجهاز" : "About this Laptop";

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid md:grid-cols-12 gap-10 items-start">
        {/* الصور */}
        <div className="md:col-span-6 space-y-3">
          <img
            src={activeImg}
            alt={product.name}
            className="rounded-xl shadow img-lift w-full object-cover"
          />
          <div className="flex gap-2">
            {product.gallery.map((g, i) => {
              const isActive = g === activeImg;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImg(g)}
                  className={`border rounded-lg p-[2px] bg-white transition ${
                    isActive ? "border-black" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={g}
                    alt=""
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* التفاصيل */}
        <div className="md:col-span-6 space-y-3">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl font-semibold">
            {dict.priceEGP(product.priceEGP)}
          </p>

          {/* جدول المواصفات */}
          <h3 className="text-lg font-bold mt-6 mb-2">{specsTitle}</h3>
          <table className="w-full border text-sm">
            <tbody>
              {product.specs.map((row) => (
                <tr key={row.key} className="border-b">
                  <td className="p-2 w-40 font-medium bg-gray-50">
                    {lang === "ar" ? row.labelAr : row.labelEn}
                  </td>
                  <td className="p-2">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* الوصف */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">{aboutTitle}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {lang === "ar" ? product.descAr : product.descEn}
            </p>
          </div>

          {/* الأزرار */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button className="nx-btn nx-btn-dark flex-1">
              {lang === "ar" ? "أضف إلى السلة" : "Add to Cart"}
            </button>
            <button className="nx-btn flex-1 border">
              {lang === "ar" ? "اسأل عن المنتج" : "Ask for recommendation"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
