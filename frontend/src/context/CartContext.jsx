/* filename: src/context/CartContext.jsx */
/* ─────────────────────────────────────────────
   🛒 Cart Context – Add/Remove items + Counter
   ───────────────────────────────────────────── */

import React, { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const toggleCart = () => setIsOpen(!isOpen);

  return (
    <CartContext.Provider value={{ cart, addToCart, isOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
