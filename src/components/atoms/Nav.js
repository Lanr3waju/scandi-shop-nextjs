import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Nav({ categories }) {
    const router = useRouter()
    const [filterState, setFilterState] = useState(categories[0])

    useEffect(() => {
        setFilterState(router.query.filter)
    }, [router.query.filter])
    return (
        <nav className="w-fit">
            <ul className="flex justify-between font-Raleway text-text flex-col md:flex-row">
                {categories.map((category) => (
                    <li
                        className={`${category === filterState &&
                            "border-b-2 border-primary text-primary"
                            }`}
                        key={category}
                    >
                        <button
                            className="p-4 font-medium uppercase"
                            onClick={() =>
                                router.push(`/categories?filter=${category}`, undefined, {
                                    shallow: true,
                                })
                            }
                            type="button"
                        >
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
