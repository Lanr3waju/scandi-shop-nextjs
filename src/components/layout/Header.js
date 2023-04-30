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
        <header className='sticky top-0 border-t-4 border-primary bg-white w-full'>
            <nav>
                <ul className='flex p-4 mb-4 font-Raleway text-text'>
                    {categories.map((category) => {
                        return (
                            <li key={category}>
                                <button type='button' onClick={() => handleCategoryFilter(category)} className={`py-2 mx-5 uppercase ${ category === filterState && `border-b-2 border-primary text-primary` }`}>{category}</button>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </header>
    )
}

export default Header
