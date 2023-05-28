import Image from "next/image";
import Link from "next/link";
import { ScandiStore } from "../../../context/context";
import { useContext } from "react";

export default function CartBtn() {
    const { totalQuantity } = useContext(ScandiStore);

    return (
        <li className="p-4">
            <Link href="/products/cart">
                {totalQuantity > 0 && <div className="bg-primary rounded-full w-4 h-4 absolute text-xs text-white font-medium border-2 border-white p-2 top-7 right-1 flex justify-center items-center">{totalQuantity}</div>}
                <Image
                    src="/cart.png"
                    className="w-5 h-5 object-contain"
                    width={40}
                    height={40}
                    alt="cart"
                />
            </Link>
        </li>
    );
}
