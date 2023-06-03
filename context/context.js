import { createContext, useState, useEffect } from "react";
import getCartFromLocalStorage from "@/components/atoms/getCartFromLocalStorage";
import store from "../data/store.json";
import createTotalPriceAndQty from "@/components/molecules/getTotalPriceQty";
import roundToTwoDecimalPlaces from "@/components/atoms/roundToTwoFloat";

const initialCurrency =
  store.data.categories[0].products[0].prices[0].currency.symbol;

export const ScandiStore = createContext();

function Context({ children }) {
  const [currency, setCurrency] = useState(initialCurrency);
  const [cart, setCart] = useState(getCartFromLocalStorage());
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const totalPriceAndQty = cart ? createTotalPriceAndQty(cart, currency) : { totalPrice: 0, totalQuantity: 0 };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setTotalQuantity(totalPriceAndQty.totalQuantity);
  }, [cart]);

  useEffect(() => {
    setTotalPrice(roundToTwoDecimalPlaces(totalPriceAndQty.totalPrice));
  }, [cart, currency]);

  return (
    <ScandiStore.Provider
      value={{
        currency,
        setCurrency,
        cart,
        setCart,
        totalPrice,
        setTotalPrice,
        totalQuantity,
        setTotalQuantity,
      }}
    >
      {children}
    </ScandiStore.Provider>
  );
}

export default Context;
