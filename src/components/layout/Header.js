import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import store from "../../../data/store.json";
import ToggleCurrencySwitcher from "../molecules/ToggleCurrencySwitcher";
import { ScandiStore } from "../../../context/context";
import { useContext, useEffect, useState } from "react";

export const categories = store.data.categories.map(
  (category) => category.name
);

function Header({ setOverlay }) {
  const { cart } = useContext(ScandiStore);
  const router = useRouter();
  const [filterState, setFilterState] = useState(categories[0]);

  useEffect(() => {
    setFilterState(router.query.filter);
  }, [router.query.filter]);

  return (
    <header className="sticky top-0 border-t-4 border-primary bg-white w-full flex justify-between items-center px-14 z-50">
      <nav className="w-1/4">
        <ul className="flex font-Raleway text-text">
          {categories.map((category) => (
            <li key={category}>
              <button
                type="button"
                onClick={() =>
                  router.push(`/categories?filter=${category}`, undefined, {
                    shallow: true,
                  })
                }
                className={`p-4 uppercase mr-4 ${
                  category === filterState &&
                  "border-b-2 border-primary text-primary"
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <Link href="/">
        <Image
          className="w-9 h-9 object-contain"
          src="/logo.png"
          width={40}
          height={40}
          alt="logo"
        />
      </Link>
      <ul className="flex w-1/3 justify-end items-center">
        <li>
          <ToggleCurrencySwitcher setOverlay={setOverlay} />
        </li>
        <li>
          <button type="button" onClick={() => router.push("/products/cart")}>
            <Image
              src="/cart.png"
              className="ml-8 w-5 h-5 object-contain"
              width={40}
              height={40}
              alt="cart"
            />
          </button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
