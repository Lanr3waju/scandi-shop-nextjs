import { createContext, useState, useEffect } from "react";
import getCartFromLocalStorage from "@/components/atoms/getCartFromLocalStorage";
import store from "../data/store.json";

const initialCurrency =
  store.data.categories[0].products[0].prices[0].currency.symbol;

export const ScandiStore = createContext();

function Context({ children }) {
  const [currency, setCurrency] = useState(initialCurrency);
  const [cart, setCart] = useState(getCartFromLocalStorage());
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <ScandiStore.Provider value={{ currency, setCurrency, cart, setCart, totalPrice, setTotalPrice, totalQuantity, setTotalQuantity }}>
      {children}
    </ScandiStore.Provider>
  );
}

export default Context;
