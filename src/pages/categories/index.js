import Head from "next/head";
import { useRouter } from "next/router";
import store from "../../../data/store.json";
import Category from "@/components/organisms/Category";

export default function Categories() {
  const router = useRouter();

  const filteredCategory = store.data.categories.find(
    ({ name }) => name === router.query.filter
  );

  if (router.query.filter !== filteredCategory?.name) {
    return <h2>Not Available Yet</h2>;
  }

  return (
    <div>
      <Head>
        <title>Product Listing Page</title>
      </Head>
      <main className="px-14 font-Raleway pt-8 transition-colors">
        <h2 className="capitalize text-text text-3xl my-10">
          {router.query.filter}
        </h2>
        <Category store={filteredCategory} />
      </main>
    </div>
  );
}
