import Cart from "@/components/organisms/Cart";
import Head from "next/head";
import store from "../../../../data/store.json";

export default function CartPage() {
  return (
    <>
      <Head>
        <title>Cart Page</title>
      </Head>
      <main className="p-14 font-Raleway text-text">
        <h2 className="capitalize text-text text-3xl my-10 font-bold">CART</h2>
        <Cart store={store.data.categories[0].products} />
      </main>
    </>
  );
}
