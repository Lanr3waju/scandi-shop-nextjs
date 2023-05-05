import { useState, useEffect } from "react";
import { Currency } from "../../context/context";
import { useContext } from "react";
import CurrencySwitcher from "./CurrencySwitcher";

export default function ToggleCurrencySwitcher({setOverlay}) {
    const [currencyState, setCurrencyState] = useState(false);
    const { currency } = useContext(Currency);

    useEffect(() => {
        setOverlay(currencyState)
    }, [currencyState]);
    return (
        <>
            <button type="button" className="font-Raleway font-medium text-lg" onClick={() => setCurrencyState(!currencyState)}>
                { currency }<img className={`inline p-3 ${currencyState ? 'rotate-180 ' : 'hover:animate-bounce'}`} alt='currency' src='/arr-down.png' />
            </button>
            { currencyState && <CurrencySwitcher setCurrencyState={setCurrencyState} /> }
        </>
    );
}
