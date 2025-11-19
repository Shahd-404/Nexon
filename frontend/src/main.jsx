/* filename: src/main.jsx */
/* ─────────────────────────────────────────────────────────────
   🚀 App bootstrap
   - ReactDOM root
   - BrowserRouter
   - LangProvider
   - CartProvider
   ──────────────────────────────────────────────────────────── */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/globals.css";
import { LangProvider } from "./context/LangContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <LangProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </LangProvider>
    </BrowserRouter>
  </React.StrictMode>
);
