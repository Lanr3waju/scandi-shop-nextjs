import Head from "next/head";
import { useRouter } from "next/router";
import store from "../../../data/store.json";
import Image from "next/image";
import { useState, useEffect } from "react";
import ImageMagnifier from "@/components/Magnifier";
import { Currency } from "../../../context/context";
import { useContext } from "react";
import parse from 'html-react-parser';



export default function DescriptionPage() {
  const { currency } = useContext(Currency);
  const router = useRouter();


  const product = store.data.categories[0].products.find(
    (product) => product.id === router.query.description
  );
  const [attrState, setAttrState] = useState({ productId: product?.id });
  const [activeImage, setActiveImage] = useState("/large-placeholder.png");
  const productNameArr = product?.name.split(" ");
  const productFirstName = productNameArr && productNameArr[0];
  const productOtherNames = productNameArr && productNameArr.slice(1).join(" ");
  const price = product?.prices.find((price) => price.currency.symbol === currency);
  const productAttributesLength = product?.attributes.length;
  const attrStateLength = Object.keys(attrState).length;

  console.log(productAttributesLength, 'prod length');
  console.log(attrStateLength, 'attr Length')


  useEffect(() => {
    product && setActiveImage(product?.gallery[0]);
  }, [router.query.description]);

  const handleProductAttr = (key, value) => {
    setAttrState((prevState) => { return { ...prevState, [key]: value }; });
  };

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
          {product?.attributes.map((attr) => (
            <ul key={attr.id}>
              <li className="uppercase font-semibold mt-7">
                {attr.name}
                :
              </li>
              <li>
                <ul className="flex flex-wrap w-full">
                  {attr.items.map((item) => (
                    <li key={item.id}>
                      {attr.type === 'swatch' ? (
                        <div className={`w-10 h-10 border-2 flex justify-center items-center my-2 mx-2 ${attrState[attr.name] === item.value ? 'border-primary' : 'border-transparent'}`}>
                          <button
                            onClick={() => handleProductAttr(attr.name, item.value)}
                            style={{
                              backgroundColor: item.value,
                            }}
                            aria-label="Product Colors"
                            className="flex justify-center items-center my-2 mx-2 absolute w-8 h-8"
                            name={attr.name}
                            type="button"
                          />
                        </div>
                      ) : (
                        <button
                          onClick={() => handleProductAttr(attr.name, item.value)}
                          className={`font-SourceSans flex justify-center items-center border-2 border-black w-16 h-12 my-2 mx-2 ${attrState[attr.name] === item.value ? 'bg-black text-white' : 'bg-white text-black'}`}
                          id={item.id}
                          type="button"
                          name={attr.name}
                        >
                          {item.value}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          ))}
          <h3 className="font-RobotoCondensed font-bold mt-7">
            <span className="text-lg">PRICE:</span>
            <span className="block text-2xl">{currency}  {price?.amount}</span>
          </h3>
          <button className={`bg-primary text-white py-4 px-8 w-4/5 font-semibold my-5 ${product?.inStock && 'hover:bg-btnHover active:bg-btnActive transition-colors'} disabled:opacity-50`} disabled={!product?.inStock || attrStateLength < productAttributesLength + 1} type="button">ADD TO CART</button>
          <div className="font-medium tracking-wider p-2 font-Roboto mt-10 leading-6 max-h-56 mb-3 scrollbar">{product && parse(product.description)}</div>
        </section>
      </main>
    </>
  );
}
