import Image from "next/image";
import Link from "next/link";
import { Currency } from "../../context/context";
import { useContext } from "react";

export default function Category({ store }) {
  const { currency } = useContext(Currency);

  return (
    <ul className={ `flex flex-wrap justify-start` }>
      { store?.products.map(({ id, gallery, name, prices }) => (
        <li key={ id }>
          <Link className="min-w-[386px] min-h-[444px]" href={ `/${ id }` }>
            <Image
              className="w-4/5 h-3/5 object-cover border-b-2 border-primary pb-2 -z-10 relative"
              src={ gallery[0] }
              width={ 330 }
              height={ 340 }
              placeholder={ true }
              alt={ name }
            />
            <h2 className="opacity-80 my-3">{ name }</h2>
            { prices.map((price) => {
              if (price.currency.symbol === currency)
              {
                return (<p key={ price.amount } className="font-Inter font-medium tracking-wide">{ price.currency.symbol }  { price.amount }</p>);
              }
            }
            ) }
          </Link>
        </li>
      )) }
    </ul>
  );
}
