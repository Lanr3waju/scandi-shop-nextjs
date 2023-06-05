import Head from "next/head"
import { useRouter } from "next/router"
import store from "../../../data/store.json"
import Category from "@/components/organisms/Category"

export default function Categories() {
  const router = useRouter()

  const filteredCategory = store.data.categories.find(
    ({ name }) => name === router.query.filter
  )

  if (router.query.filter !== filteredCategory?.name) {
    return <h2>Not Available Yet</h2>
  }

  return (
    <>
      <Head>
        <title>Product Listing Page</title>
      </Head>
      <main className="px-14 pt-8 font-Raleway transition-colors hidden md:block">
        <h2 className="my-10 text-3xl capitalize text-primary-content">
          {router.query.filter}
        </h2>
        <Category store={filteredCategory} />
      </main>
    </>
  )
}
