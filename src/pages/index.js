import Head from "next/head"
import store from "../../data/store.json"
import Homepage from "@/components/organisms/Homepage"
import MobileMessage from "@/components/atoms/MobileMessage"

export default function HomePage() {
  return (
    <>
      <MobileMessage />
      <div className="hidden md:block">
      <Head>
        <title>Homepage</title>
      </Head>
      <Homepage store={store} />
      </div>
    </>
  )
}

HomePage.getLayout = function PageLayout(page) {
  return <>{page}</>
}
