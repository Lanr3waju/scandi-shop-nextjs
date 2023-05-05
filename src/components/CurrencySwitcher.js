import store from '../../data/store.json';
import { Currency } from "../../context/context";
import { useContext } from "react";

export default function CurrencySwitcher({setCurrencyState}) {
    const { setCurrency } = useContext(Currency);
    const availableCurrencies = store.data.categories[0].products[0].prices;

    const handleSetCurrency = (currency) => {
        setCurrency(currency)
        setCurrencyState(false)
    }
    return (
        <div>
            <ul className='absolute font-Raleway shadow-md shadow-hoverBackground rounded-md -ml-5 z-50 bg-white mt-4'>
                {
                    availableCurrencies.map(({ currency }) => (
                        <li key={ currency.label }>
                            <button type='button' className='flex justify-around w-full font-medium py-3 px-6 hover:bg-hoverBackground transition-all' onClick={ () => handleSetCurrency(currency.symbol) }>
                                <span className='font-semibold'>{ currency.symbol } </span>
                                <span>{ currency.label }</span>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
