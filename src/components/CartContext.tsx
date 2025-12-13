import { createContext, useContext, useState } from "react";
import type {  ReactNode } from "react";

import type { OrderItem } from "../core/types/OrderItem";

type CartItem = OrderItem & { quantity: number };
type CartState = { [key: string]: CartItem };

interface CartContextType {
  cart: CartState;
  addToCart: (item: OrderItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void; 
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartState>({});

  const addToCart = (item: OrderItem) => {
    setCart((prev) => {
      const currentQty = prev[item.productid]?.quantity || 0;
      return {
        ...prev,
        [item.productid]: { ...item, quantity: currentQty + 1 },
      };
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      if (!prev[id]) return prev;
      const newQty = prev[id].quantity - 1;
      if (newQty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: { ...prev[id], quantity: newQty } };
    });
  };

 
 const clearCart = () => {
    setCart({});
  };



  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};