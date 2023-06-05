import store from "../../../data/store.json"
import { ScandiStore } from "../../../context/context"
import { useContext } from "react"

export default function CurrencySwitcher({ setCurrencyState }) {
  const { setCurrency } = useContext(ScandiStore)
  const availableCurrencies = store.data.categories[0].products[0].prices

  const handleSetCurrency = (currency) => {
    setCurrency(currency)
    setCurrencyState(false)
  }
  return (
    <div>
      <ul className="absolute z-50 -ml-5 mt-4 rounded-md bg-white font-Raleway shadow-md shadow-hoverBackground">
        {availableCurrencies.map(({ currency }) => (
          <li key={currency.label}>
            <button
              className="flex w-full justify-around px-6 py-3 font-medium transition-all hover:bg-hoverBackground"
              onClick={() => handleSetCurrency(currency.symbol)}
              type="button"
            >
              <span className="font-semibold">{currency.symbol} </span>
              <span>{currency.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
