"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface CartContextProps {
  cartCount: number;
  addToCart: (count: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("http://localhost:5000/api/cart", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCartCount(response.data.totalCount);
        }
      } catch (err) {
        console.error("خطا در دریافت سبد خرید:", err);
      }
    };
    fetchCart();
  }, []);

  const addToCart = (count: number) => {
    setCartCount((prev) => prev + count);
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart باید داخل CartProvider استفاده شود");
  }
  return context;
};
