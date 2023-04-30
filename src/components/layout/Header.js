import store from '../../../data/store.json'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

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
        <header className='sticky top-0 border-t-4 border-primary bg-white w-full flex justify-between items-center px-20'>
            <nav className='w-1/4'>
                <ul className='flex font-Raleway text-text'>
                    {categories.map((category) => {
                        return (
                            <li key={category}>
                                <button type='button' onClick={() => handleCategoryFilter(category)} className={`p-4 uppercase mr-4 ${ category === filterState && `border-b-2 border-primary text-primary` }`}>{category}</button>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <Link href='/'><Image src='/logo.png' width={35} height={35} alt='logo' /></Link>
            <ul className='flex w-1/3 justify-end items-center'>
                <li>
                    <Image src='/currency.png' width={38} height={29} alt='currency' />
                </li>
                <li>
                    <Image src='/cart.png' className='ml-8' width={22} height={19} alt='cart' />
                </li>
            </ul>
        </header>
    )
}

export default Header;
