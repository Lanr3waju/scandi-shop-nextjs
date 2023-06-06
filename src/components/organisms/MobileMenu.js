import CartBtn from "../atoms/CartBtn"
import Nav from "../atoms/Nav"
import ToggleCurrencySwitcher from "../molecules/ToggleCurrencySwitcher"

export default function MobileMenu({ categories, setOverlay }) {
    return (
        <div className="h-[80vh] p-4 md:hidden">
            <Nav categories={categories} />
            <ul className="relative w-fit justify-start md:items-center md:justify-around flex flex-col md:flex-row">
                <li className="p-4">
                    <ToggleCurrencySwitcher setOverlay={setOverlay} />
                </li>
                <CartBtn />
            </ul>
        </div>
    )
}
