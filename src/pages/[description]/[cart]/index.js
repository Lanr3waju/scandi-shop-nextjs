import Cart from "@/components/organisms/Cart"
import Head from "next/head"
import store from "../../../../data/store.json"

export default function CartPage() {
  return (
    <>
      <Head>
        <title>Cart Page</title>
      </Head>
      <main className="p-14 font-Raleway text-primary">
        <h2 className="my-10 mb-2 border-b-4 border-secondary-content text-3xl font-bold capitalize text-primary">
          CART
        </h2>
        <Cart store={store.data.categories[0].products} />
      </main>
    </>
  )
}
