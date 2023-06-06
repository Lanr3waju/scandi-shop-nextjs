import CartBtn from "../atoms/CartBtn"
import Nav from "../atoms/Nav"
import ToggleCurrencySwitcher from "../molecules/ToggleCurrencySwitcher"

export default function MobileMenu({ categories, setOverlay, setIsOpen }) {
    return (
        <div className="h-[90vh] p-4 md:hidden fixed bg-white w-full z-50">
            <div onClick={setIsOpen}><Nav categories={categories} /></div>
            <ul className="relative w-fit justify-start md:items-center md:justify-around flex flex-col md:flex-row">
                <li className="p-4">
                    <ToggleCurrencySwitcher setOverlay={setOverlay} />
                </li>
                <div onClick={setIsOpen}><CartBtn /></div>
            </ul>
        </div>
    )
}
