import Head from "next/head"
import {useRouter} from "next/router"
import {categories} from "@/components/layout/Header"
import {useEffect} from "react"

export default function Homepage() {
  const router = useRouter()
  useEffect(() => {
    router.push(`/categories?filter=${ categories[ 0 ] }`)
  }, [])
  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      Redirecting to product categories
    </>
  )
}
