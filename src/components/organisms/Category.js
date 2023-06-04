import Image from "next/image";
import Link from "next/link";
import { ScandiStore } from "../../../context/context";
import { useContext } from "react";

export default function Category({ store }) {
  const { currency } = useContext(ScandiStore);

  return (
    <ul className="flex w-full flex-wrap gap-4 pb-5 min-h-screen">
      {store?.products.map(({ id, gallery, name, prices, inStock }) => (
        <li
          key={id}
          className="w-fit h-96 py-5 px-1 hover:shadow-md text-primary-content rounded-sm transition-shadow relative"
        >
          <span
            className={`text-3xl font-medium text-error-content absolute top-1/3 left-[18%] -rotate-45 opacity-100 ${
              inStock && "hidden"
            }`}
          >
            Out of stock
          </span>
          <Link href={`/${id}`}>
            <section className={`relative -z-30 ${!inStock && "opacity-40"}`}>
              <Image
                className="w-72 h-72 object-contain pb-2"
                src={gallery[0]}
                width={300}
                height={300}
                placeholder={true}
                alt={name}
              />
              <h2 className="opacity-80 my-3">
                {name}
                {prices.map((price) => {
                  if (price.currency.symbol === currency) {
                    return (
                      <span
                        key={price.amount}
                        className="font-Inter block tracking-wide"
                      >
                        {price.currency.symbol} {price.amount}
                      </span>
                    );
                  }
                })}
              </h2>
            </section>
          </Link>
        </li>
      ))}
    </ul>
  );
}
