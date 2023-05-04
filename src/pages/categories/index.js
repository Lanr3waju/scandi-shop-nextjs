import Head from "next/head";
import { useRouter } from "next/router";
import store from "../../../data/store.json";
import Category from "@/components/Category";

export default function Categories() {
  const router = useRouter();
  const filteredCategory = store.data.categories.find(
    ({ name }) => name === router.query.filter
  );

  if (router.query.filter !== filteredCategory?.name) {
    return <h2>Not Available Yet</h2>;
  }

  return (
    <>
      <Head>
        <title>Product Listing Page</title>
      </Head>
      <main className="px-20 font-Raleway mt-8">
        <h2 className="capitalize text-text text-3xl my-14">
          {router.query.filter}
        </h2>
        <Category store={filteredCategory} />
      </main>
    </>
  );
}
