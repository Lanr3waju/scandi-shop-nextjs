import Head from "next/head"
import store from "../../data/store.json"
import Homepage from "@/components/organisms/Homepage"

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <Homepage store={store} />
    </>
  )
}

HomePage.getLayout = function PageLayout(page) {
  return <>{page}</>
}
