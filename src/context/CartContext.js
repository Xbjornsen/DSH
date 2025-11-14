import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('demountableCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('demountableCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (demountable, pricing) => {
    const cartItem = {
      id: Date.now(),
      demountable: JSON.parse(JSON.stringify(demountable)), // Deep clone
      pricing: JSON.parse(JSON.stringify(pricing)),
      addedAt: new Date().toISOString()
    };

    setCart(prev => [...prev, cartItem]);
    return cartItem;
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateCartItem = (itemId, updatedDemountable, updatedPricing) => {
    setCart(prev => prev.map(item =>
      item.id === itemId
        ? { ...item, demountable: updatedDemountable, pricing: updatedPricing }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.pricing.total, 0);
  };

  const getItemCount = () => {
    return cart.length;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        getTotalPrice,
        getItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
