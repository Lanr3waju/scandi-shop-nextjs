import store from '../../../data/store.json'
import {useContext, useEffect} from 'react'
import {Category_filter} from '@/context/context'
import Router from 'next/router'

function Header() {
    const navs = store.data.categories.map((category) => category.name)
    const {categoryFilter, setCategoryFilter} = useContext(Category_filter)
    console.log(categoryFilter)
    useEffect(() => {
        setCategoryFilter(navs[ 0 ])
    }, [])

    const handleCategoryFilter = (nav) => {
        setCategoryFilter(nav)
        Router.push(`/category?filter=${ nav }`, undefined, {shallow: true})
    }

    return (
        <ul className=' bg-black flex p-4 mb-4 text-white text-xl font-bold'>
            {navs.map((nav) => {
                return (
                    <li key={nav}>
                        <button type='button' onClick={() => handleCategoryFilter(nav)} className={`m-4 ${ nav === categoryFilter && `bg-green-500` }`}>{nav}</button>
                    </li>
                )
            })}
        </ul>
    )
}

export default Header
