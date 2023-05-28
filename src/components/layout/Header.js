import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import store from "../../../data/store.json";
import ToggleCurrencySwitcher from "../molecules/ToggleCurrencySwitcher";
import { useEffect, useState } from "react";
import CartBtn from "../atoms/CartBtn";

export const categories = store.data.categories.map(
  (category) => category.name
);

function Header({ setOverlay }) {
  const router = useRouter();
  const [filterState, setFilterState] = useState(categories[0]);

  useEffect(() => {
    setFilterState(router.query.filter);
  }, [router.query.filter]);

  return (
    <header className="sticky top-0 border-t-4 border-primary bg-white w-full flex justify-between items-center px-14 z-50">
      <nav className="w-fit">
        <ul className="flex font-Raleway text-text justify-between">
          {categories.map((category) => (
            <li key={category} className={`${category === filterState &&
              "border-b-2 border-primary text-primary"
              }`}>
              <button
                type="button"
                onClick={() =>
                  router.push(`/categories?filter=${category}`, undefined, {
                    shallow: true,
                  })
                }
                className="p-4 uppercase font-medium"
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
      <ul className="flex w-fit justify-around items-center relative">
        <li className="p-4">
          <ToggleCurrencySwitcher setOverlay={setOverlay} />
        </li>
        <CartBtn />
      </ul>
    </header>
  );
}

export default Header;
