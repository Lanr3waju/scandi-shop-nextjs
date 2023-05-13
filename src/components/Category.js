import Image from "next/image";
import Link from "next/link";
import { ScandiStore } from "../../context/context";
import { useContext } from "react";

export default function Category({ store }) {
  const { currency } = useContext(ScandiStore);

  return (
    <ul className="flex flex-wrap justify-start gap-20 pb-5 min-h-screen">
      {store?.products.map(({ id, gallery, name, prices, inStock }) => (
        <li
          key={id}
          className="w-80 h-96 shadow-sm rounded-lg p-6 shadow-hoverBackground hover:shadow-overlay hover:shadow-lg transition-shadow relative"
        >
          <span
            className={`text-3xl font-medium text-overlay absolute top-1/4 left-[18%] -rotate-45 opacity-100 z-20 ${
              inStock && "hidden"
            }`}
          >
            Out of stock
          </span>
          <Link className={`${!inStock && "opacity-40"}`} href={`/${id}`}>
            <Image
              className="w-full h-[88%] object-contain border-b-2 border-primary pb-2 -z-10 relative"
              src={gallery[0]}
              width={330}
              height={340}
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
          </Link>
        </li>
      ))}
    </ul>
  );
}
