import Link from 'next/link';
import store from '../../../data/store.json';

function Header() {
  return (
    <ul className=" bg-black flex p-4 mb-4 text-white text-xl font-bold">
      {store.data.categories.map((category) => (
        <li key={category.name}>
          <Link className="m-4" href="/#">
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Header;
