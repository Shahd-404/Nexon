/* filename: src/App.jsx */
/* ─────────────────────────────────────────────────────────────
   🧭 App Router
   - Public ShopFront (Home)
   - Product Details
   - Nexon Assistant (floating)
   ──────────────────────────────────────────────────────────── */
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import NexonAssistant from "./components/chat/NexonAssistant.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1a1f36]">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>
      <Footer />

      {/* 💬 Nexon Assistant chatbot (floating) */}
      <NexonAssistant />
    </div>
  );
}
