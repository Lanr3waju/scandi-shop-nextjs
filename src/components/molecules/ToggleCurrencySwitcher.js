import { useState, useEffect } from "react";
import { ScandiStore } from "../../../context/context";
import { useContext } from "react";
import CurrencySwitcher from "../atoms/CurrencySwitcher";

export default function ToggleCurrencySwitcher({ setOverlay }) {
  const [currencyState, setCurrencyState] = useState(false);
  const { currency } = useContext(ScandiStore);

  useEffect(() => {
    setOverlay(currencyState);
  }, [currencyState]);
  return (
    <>
      <button
        type="button"
        className="font-Raleway font-medium text-lg"
        onClick={() => setCurrencyState(!currencyState)}
      >
        {currency}
        <img
          className={`inline p-3 ${
            currencyState && "rotate-180 "
          }`}
          alt="currency"
          src="/arr-down.png"
        />
      </button>
      {currencyState && (
        <CurrencySwitcher setCurrencyState={setCurrencyState} />
      )}
    </>
  );
}
