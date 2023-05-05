import { createContext, useState } from "react";
import store from '../data/store.json'

const initialCurrency = store.data.categories[0].products[0].prices[0].currency.symbol;
export const Currency = createContext();

function Context({ children }) {
    const [currency, setCurrency] = useState(initialCurrency);

    return (
        <Currency.Provider value={ { currency, setCurrency } }>
            { children }
        </Currency.Provider>
    );
}

export default Context;
