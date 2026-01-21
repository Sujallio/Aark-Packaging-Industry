import { createContext, useContext, useState } from "react";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (id, title) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id, title, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  const getTotalItems = () => items.reduce((sum, item) => sum + item.quantity, 0);

  const generateWhatsAppLink = (phoneNumber) => {
    if (items.length === 0) return "";
    
    const message = `Hello AARK Packaging Industries,\n\nI would like to enquire about the following products:\n\n${items
      .map((item) => `• ${item.title} - Quantity: ${item.quantity}`)
      .join("\n")}\n\nPlease provide pricing and availability details.\n\nThank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        generateWhatsAppLink,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
