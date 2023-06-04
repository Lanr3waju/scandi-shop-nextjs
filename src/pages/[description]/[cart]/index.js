import Cart from "@/components/organisms/Cart";
import Head from "next/head";
import store from "../../../../data/store.json";

export default function CartPage() {
  return (
    <>
      <Head>
        <title>Cart Page</title>
      </Head>
      <main className="p-14 font-Raleway text-primary">
        <h2 className="capitalize text-primary text-3xl my-10 font-bold border-b-4 mb-2 border-secondary-content">
          CART
        </h2>
        <Cart store={store.data.categories[0].products} />
      </main>
    </>
  );
}
