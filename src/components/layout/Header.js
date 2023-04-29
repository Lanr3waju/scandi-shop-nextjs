import store from '../../../data/store.json'
import Link from 'next/link'
function Header() {
    return (
        <ul className=' bg-black flex p-4 mb-4 text-white text-xl font-bold'>
            {store.data.categories.map((category) => {
                return (
                    <li key={category.name}>
                        <Link className='m-4' href='/#'>{category.name}</Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default Header
