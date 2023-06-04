import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import store from "../../../data/store.json"
import ToggleCurrencySwitcher from "../molecules/ToggleCurrencySwitcher"
import { useEffect, useState } from "react"
import CartBtn from "../atoms/CartBtn"

export const categories = store.data.categories.map(
  (category) => category.name
)

function Header({ setOverlay }) {
  const router = useRouter()
  const [filterState, setFilterState] = useState(categories[0])

  useEffect(() => {
    setFilterState(router.query.filter)
  }, [router.query.filter])

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between border-t-4 border-primary bg-white px-14">
      <nav className="w-fit">
        <ul className="flex justify-between font-Raleway text-text">
          {categories.map((category) => (
            <li
              className={`${
                category === filterState &&
                "border-b-2 border-primary text-primary"
              }`}
              key={category}
            >
              <button
                className="p-4 font-medium uppercase"
                onClick={() =>
                  router.push(`/categories?filter=${category}`, undefined, {
                    shallow: true,
                  })
                }
                type="button"
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <Link href="/">
        <Image
          alt="logo"
          className="h-9 w-9 object-contain"
          height={40}
          src="/logo.png"
          width={40}
        />
      </Link>
      <ul className="relative flex w-fit items-center justify-around">
        <li className="p-4">
          <ToggleCurrencySwitcher setOverlay={setOverlay} />
        </li>
        <CartBtn />
      </ul>
    </header>
  )
}

export default Header
