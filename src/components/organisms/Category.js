import Image from "next/image"
import Link from "next/link"
import { ScandiStore } from "../../../context/context"
import { useContext } from "react"

export default function Category({ store }) {
  const { currency } = useContext(ScandiStore)

  return (
    <ul className="flex min-h-screen w-full flex-wrap gap-4 pb-5">
      {store?.products.map(({ id, gallery, name, prices, inStock }) => (
        <li
          className="relative h-96 w-fit rounded-sm px-1 py-5 text-primary-content transition-shadow hover:shadow-md"
          key={id}
        >
          <span
            className={`absolute left-[18%] top-1/3 -rotate-45 text-3xl font-medium text-error-content opacity-100 ${
              inStock && "hidden"
            }`}
          >
            Out of stock
          </span>
          <Link href={`/${id}`}>
            <section className={`relative -z-30 ${!inStock && "opacity-40"}`}>
              <Image
                alt={name}
                className="h-72 w-72 object-contain pb-2"
                height={300}
                placeholder={true}
                src={gallery[0]}
                width={300}
              />
              <h2 className="my-3 opacity-80">
                {name}
                {prices.map((price) => {
                  if (price.currency.symbol === currency) {
                    return (
                      <span
                        className="block font-Inter tracking-wide"
                        key={price.amount}
                      >
                        {price.currency.symbol} {price.amount}
                      </span>
                    )
                  }
                })}
              </h2>
            </section>
          </Link>
        </li>
      ))}
    </ul>
  )
}
