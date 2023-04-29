import Head from "next/head"
import {useRouter} from "next/router"

export default function CategoryPage() {
    const router = useRouter()
    const category = router.query.category
    return (
        <>
            <Head>
                <title>Category Page</title>
            </Head>
            {category}
        </>
    )
}
