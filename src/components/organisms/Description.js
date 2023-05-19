import { useRouter } from "next/router";
import store from "../../../data/store.json";
import Image from "next/image";
import { useState, useEffect } from "react";
import ImageMagnifier from "@/components/atoms/Magnifier";
import { ScandiStore } from "../../../context/context";
import { useContext } from "react";
import createTotalPriceAndQty from "../atoms/getTotalPriceQty";
import parse from "html-react-parser";

export default function Description() {
  const { currency, cart, setCart, totalPrice, setTotalPrice, totalQuantity, setTotalQuantity } = useContext(ScandiStore);
  const router = useRouter();

  const product = store.data.categories[0].products.find(
    (product) => product.id === router.query.description
  );
  const [attrState, setAttrState] = useState({ productId: product?.id, quantity: 1 });
  const [activeImage, setActiveImage] = useState("/large-placeholder.png");
  const productNameArr = product?.name.split(" ");
  const productFirstName = productNameArr && productNameArr[0];
  const productOtherNames = productNameArr && productNameArr.slice(1).join(" ");
  const price = product?.prices.find(
    (price) => price.currency.symbol === currency
  );
  const productAttributesLength = product?.attributes.length;
  const attrStateLength = Object.keys(attrState).length;
  const totalPriceAndQty = createTotalPriceAndQty(cart, currency)

  useEffect(() => {
    product && setActiveImage(product?.gallery[0]);
  }, [router.query.description]);

  useEffect(() => {
    setTotalPrice(totalPriceAndQty.totalPrice);
  }, [cart, currency]);

  useEffect(() => {
    setTotalQuantity(totalPriceAndQty.totalQuantity);
  }, [cart]);

  const handleProductAttr = (key, value, attributes, images) => {
    setAttrState((prevState) => {
      return { ...prevState, [key]: value, attributes: attributes, images: images, prices: product?.prices, name: productNameArr };
    });
  };

  const handleCart = () => {
    setCart((prevCart) => {
      if (prevCart.length < 1) {
        alert("Added item to cart");
        return [...prevCart, attrState];
      } else {
        const prod = prevCart.find(
          (item) => JSON.stringify(item) === JSON.stringify(attrState)
        );
        if (prod) {
          alert("Item already exists in cart");
          return prevCart;
        } else {
          alert("Added item to cart");
          return [...prevCart, attrState];
        }
      }
    });
  };

  return (
    <>
      <section className="w-1/4">
        <ul className="w-full">
          {product?.gallery.map((image) => (
            <li key={image}>
              <button
                className="mb-4 relative"
                onClick={() => setActiveImage(image)}
              >
                <Image
                  placeholder="blur"
                  blurDataURL="/small-placeholder.png"
                  className="w-full h-full object-contain -z-30 relative"
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
      <section className="w-fit relative">
        <ImageMagnifier src={activeImage} width={600} height={500} />
      </section>
      <section className="w-2/5">
        <h2 className="text-2xl">
          <span className="font-semibold block mb-4">{productFirstName}</span>
          <span>{productOtherNames}</span>
        </h2>
        {product?.attributes.map((attr) => (
          <ul className="relative" key={attr.id}>
            <li className="uppercase font-bold mt-7">{attr.name}:</li>
            <li>
              <ul className="flex flex-wrap w-full">
                {attr.items.map((item) => (
                  <li key={item.id}>
                    {attr.type === "swatch" ? (
                      <div>
                        <button
                          onClick={() =>
                            handleProductAttr(attr.name, item.value, product?.attributes, product?.gallery)
                          }
                          aria-label="Product Colors"
                          className={`w-10 h-10 border-2 flex justify-center items-center my-2 mx-2 ${attrState[attr.name] === item.value
                              ? "border-primary"
                              : "border-transparent"
                            }`}
                          name={attr.name}
                          type="button"
                        >
                          <div
                            style={{
                              backgroundColor: item.value,
                            }}
                            className="flex justify-center items-center my-2 mx-2 absolute w-8 h-8 -z-10"
                          />
                        </button>
                      </div>
                    ) : (
                      <button
                          onClick={() => handleProductAttr(attr.name, item.value, product?.attributes, product?.gallery)}
                        type="button"
                        name={attr.name}
                      >
                        <div
                            className={`font-SourceSans flex justify-center items-center border-2 border-black w-16 h-12 my-2 mx-2 -z-20 relative ${attrState[attr.name] === item.value
                              ? "bg-black text-white"
                              : "bg-white text-black"
                              }`}
                        >
                          {item.value}
                        </div>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        ))}
        <h3 className="font-RobotoCondensed font-bold mt-7 text-lg">PRICE:</h3>
        <p className="font-bold text-2xl font-RobotoCondensed">
          {currency} {price?.amount}
        </p>
        <button
          onClick={handleCart}
          className={`bg-primary text-white py-4 px-8 w-4/5 font-semibold my-5 ${product?.inStock &&
            "hover:bg-btnHover active:bg-btnActive transition-colors"
            } disabled:opacity-60`}
          disabled={
            !product?.inStock || attrStateLength < productAttributesLength + 6
          }
          type="button"
        >
          {product?.inStock ? "ADD TO CART" : "OUT OF STOCK"}
        </button>
        <div className="font-medium tracking-wider p-2 font-Roboto mt-10 leading-6 max-h-56 mb-3 scrollbar">
          {product && parse(product.description)}
        </div>
      </section>
    </>
  );
}
