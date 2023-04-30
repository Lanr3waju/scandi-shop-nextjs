import {useRouter} from "next/router"
import Image from "next/image"

export default function Category({store}) {
    const router = useRouter()
    return (
        <ul className="flex flex-wrap justify-evenly">
            {store?.products.map((product) => {
                return (
                    <li key={product.id} className="min-w-[386px] min-h-[444px]">
                        <h2>{product.name}</h2>
                        <Image className="w-4/5 h-3/5 object-contain" src={product.gallery[ 0 ]} width={330} height={340} alt={product.name} />
                    </li>
                )
            })}
        </ul>
    )
}
