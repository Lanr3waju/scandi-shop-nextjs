import Head from "next/head";
import { useRouter } from "next/router";
import store from "../../../data/store.json";
import Image from "next/image";
import { useState, useEffect } from "react";
import ImageMagnifier from "@/components/Magnifier";
import { Currency } from "../../../context/context";
import { useContext } from "react";



export default function DescriptionPage() {
  const { currency } = useContext(Currency);
  const router = useRouter();

  const product = store.data.categories[0].products.find(
    (product) => product.id === router.query.description
  );
  const [activeImage, setActiveImage] = useState("/large-placeholder.png");
  const [btnState, setBtnState] = useState(false);
  const productNameArr = product?.name.split(" ");
  const productFirstName = productNameArr && productNameArr[0];
  const productOtherNames = productNameArr && productNameArr.slice(1).join(" ");
  const price = product?.prices.find((price) => price.currency.symbol === currency);

  useEffect(() => {
    product && setActiveImage(product?.gallery[0]);
  }, [router.query.description]);

  useEffect(() => {
    product?.inStock ? setBtnState(true) : (false);
  }, [product]);


  return (
    <>
      <Head>
        <title>Description Page</title>
      </Head>
      <main className="flex p-14 font-Raleway text-text">
        <section className="w-1/4">
          <ul className="w-full">
            {product?.gallery.map((image) => (
              <li key={image}>
                <button className="mb-4" onClick={() => setActiveImage(image)}>
                  <Image
                    placeholder="blur"
                    blurDataURL="/small-placeholder.png"
                    className="w-full h-full object-contain"
                    src={image}
                    alt="product"
                    width={100}
                    height={100}
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section className="w-fit">
          <ImageMagnifier src={activeImage} width={600} height={500} />
        </section>
        <section className="w-2/5">
          <h2 className="text-2xl">
            <span className="font-semibold block mb-4">{productFirstName}</span>
            <span>{productOtherNames}</span>
          </h2>
          <ul></ul>
          <h3 className="font-RobotoCondensed font-bold">
            <span className="text-lg">PRICE:</span>
            <span className="block text-2xl">{currency}  {price?.amount}</span>
          </h3>
          <button className={`bg-primary text-white py-4 px-8 w-4/5 font-semibold my-5 ${btnState && 'hover:bg-btnHover active:bg-btnActive transition-colors'} disabled:opacity-50`} disabled={!btnState} type="button">ADD TO CART</button>
        </section>
      </main>
    </>
  );
}
