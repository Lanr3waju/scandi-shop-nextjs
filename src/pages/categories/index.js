import Head from "next/head"
import store from '../../../data/store.json'
import {useRouter} from "next/router"
import Category from "@/components/Category"

export default function Categories() {
    const router = useRouter()
    const filteredCategory = store.data.categories.find(({name}) => name === router.query.filter)
    return (
        <>
            <Head>
                <title>Product Listing Page</title>
            </Head>
            {router.query.filter}
            <main className="text-center font-Raleway">
                <Category store={filteredCategory} />
            </main>
        </>
    )
}
