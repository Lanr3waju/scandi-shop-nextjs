import store from '../../../data/store.json'
import {useContext, useEffect} from 'react'
import {Category_filter} from '../context/context'
import Link from 'next/link'

function Header() {
    const navs = store.data.categories.map((category) => category.name)
    const {setCategoryFilter} = useContext(Category_filter)
    useEffect(() => {
        setCategoryFilter(navs[ 0 ])
    }, [])

    return (
        <ul className=' bg-black flex p-4 mb-4 text-white text-xl font-bold'>
            {navs.map((nav) => {
                return (
                    <li key={nav}>
                        <button type='button' onClick={() => setCategoryFilter(nav)} className='m-4'>{nav}</button>
                    </li>
                )
            })}
        </ul>
    )
}

export default Header
