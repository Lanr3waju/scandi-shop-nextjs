import Head from "next/head"
import store from '../../../data/store.json'
import {useRouter} from "next/router"
import Image from "next/image"

export default function CategoryPage() {
    const router = useRouter()
    const filteredCategory = store.data.categories.find(({name}) => name === router.query.filter)
    return (
        <>
            <Head>
                <title>Product Listing Page</title>
            </Head>
            {router.query.filter}
            <main>
                <ul className="flex">
                    {filteredCategory?.products.map((product) => {
                        return (
                            <li key={product.id}>
                                <h2>{product.name}</h2>
                                <Image src={product.gallery[ 0 ]} width={354} height={330} alt={product.name} />
                            </li>
                        )
                    })}
                </ul>
            </main>
        </>
    )
}
