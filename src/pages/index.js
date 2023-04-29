import Head from "next/head"
import {useContext} from 'react'
import {Category_filter} from "@/components/context/context"

export default function CategoryPage() {
  const {categoryFilter} = useContext(Category_filter)
  return (
    <>
      <Head>
        <title>Listing Page</title>
      </Head>
      {categoryFilter}
    </>
  )
}
