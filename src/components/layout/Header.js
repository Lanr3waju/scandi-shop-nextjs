import Image from "next/image"
import Link from "next/link"
import store from "../../../data/store.json"
import ToggleCurrencySwitcher from "../molecules/ToggleCurrencySwitcher"
import CartBtn from "../atoms/CartBtn"
import Nav from "../atoms/Nav"
import HamburgerButton from "../molecules/Hamburger"
import { useState } from "react"
import MobileMenu from "../organisms/MobileMenu"

export const categories = store.data.categories.map(
  (category) => category.name
)

function Header({ setOverlay }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full items-center justify-between border-t-4 border-primary bg-white px-1 md:px-14 flex h-fit">
        <div className="hidden md:block">
          <Nav categories={categories} />
        </div>
        <Link className="p-4 flex items-center" href="/">
          <Image
            alt="logo"
            className="h-9 w-9 object-contain"
            height={40}
            src="/logo.png"
            width={40}
          />
          <h2 className="md:hidden text-xl font-medium text-primary tracking-wider font-Raleway ">ScandiShop</h2>
        </Link>
        <div className="hidden md:block">
          <ul className="relative w-fit items-center justify-around flex flex-col md:flex-row">
          <li className="p-4">
            <ToggleCurrencySwitcher setOverlay={setOverlay} />
          </li>
          <CartBtn />
        </ul>
        </div>
        <HamburgerButton isOpen={isOpen} setIsOpen={handleClick} />
      </header>
      {isOpen && <MobileMenu categories={categories} setOverlay={setOverlay} />}
    </>
  )
}

export default Header
