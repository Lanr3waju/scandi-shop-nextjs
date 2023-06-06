import Cart from "@/components/organisms/Cart"
import Head from "next/head"
import store from "../../../../data/store.json"

export default function CartPage() {
  return (
    <>
      <Head>
        <title>Cart Page</title>
      </Head>
      <main className="md:p-14 p-3 font-Raleway text-primary">
        <h2 className="my-10 border-b-4 border-secondary-content text-3xl font-bold capitalize text-primary-content">
          CART
        </h2>
        <Cart store={store.data.categories[0].products} />
      </main>
    </>
  )
}
