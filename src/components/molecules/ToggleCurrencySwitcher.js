import { useState, useEffect } from "react"
import { ScandiStore } from "../../../context/context"
import { useContext } from "react"
import CurrencySwitcher from "../atoms/CurrencySwitcher"

export default function ToggleCurrencySwitcher({ setOverlay }) {
  const [currencyState, setCurrencyState] = useState(false)
  const { currency } = useContext(ScandiStore)

  useEffect(() => {
    setOverlay(currencyState)
  }, [currencyState])
  return (
    <>
      <button
        className="font-Raleway text-lg font-medium"
        onClick={() => setCurrencyState(!currencyState)}
        type="button"
      >
        {currency}
        <img
          alt="currency"
          className={`inline p-3 ${currencyState && "rotate-180 "}`}
          src="/arr-down.png"
        />
      </button>
      {currencyState && (
        <CurrencySwitcher setCurrencyState={setCurrencyState} />
      )}
    </>
  )
}
