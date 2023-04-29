import Head from "next/head"
import {useContext} from 'react'
import store from '../../../data/store.json'
import {Category_filter} from "@/context/context"

export default function CategoryPage() {
    const {categoryFilter} = useContext(Category_filter)
    const filteredCategory = store.data.categories.find(({name}) => name === categoryFilter)
    return (
        <>
            <Head>
                <title>Product Listing Page</title>
            </Head>
            {categoryFilter}
        </>
    )
}
