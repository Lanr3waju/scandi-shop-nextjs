import { createContext, useState, useEffect } from "react";
import store from "../data/store.json";

const initialCurrency =
  store.data.categories[0].products[0].prices[0].currency.symbol;

function getCartFromLocalStorage() {
  if (typeof window !== 'undefined') {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
}

export const ScandiStore = createContext();

function Context({ children }) {
  const [currency, setCurrency] = useState(initialCurrency);
  const [cart, setCart] = useState(getCartFromLocalStorage());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  return (
    <ScandiStore.Provider value={{ currency, setCurrency, cart, setCart }}>
      {children}
    </ScandiStore.Provider>
  );
}

export default Context;
