import Image from "next/image"
import Link from "next/link"
import { ScandiStore } from "../../../context/context"
import { useContext } from "react"

export default function CartBtn() {
  const { totalQuantity } = useContext(ScandiStore)

  return (
    <li className="p-4 transition-all">
      <Link href="/products/cart">
        {totalQuantity > 0 && (
          <div className="absolute right-1 top-4 flex h-4 w-6 items-center justify-center rounded-full bg-secondary p-2 text-xs text-white">
            {totalQuantity}
          </div>
        )}
        <Image
          alt="cart"
          className="h-5 w-5 object-contain"
          height={40}
          src="/cart.png"
          width={40}
        />
      </Link>
    </li>
  )
}
