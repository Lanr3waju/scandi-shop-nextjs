import store from '../../../data/store.json'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'

export const categories = store.data.categories.map((category) => category.name)

function Header() {
    const router = useRouter()
    const [ filterState, setFilterState ] = useState(categories[ 0 ])

    useEffect(() => {
        setFilterState(router.query.filter)
    }, [ router.query.filter ])

    const handleCategoryFilter = (category) => {
        router.push(`/categories?filter=${ category }`, undefined, {shallow: true})
    }

    return (
        <ul className=' bg-black flex p-4 mb-4 text-white text-xl font-bold'>
            {categories.map((category) => {
                return (
                    <li key={category}>
                        <button type='button' onClick={() => handleCategoryFilter(category)} className={`m-4 ${ category === filterState && `bg-green-500` }`}>{category}</button>
                    </li>
                )
            })}
        </ul>
    )
}

export default Header
