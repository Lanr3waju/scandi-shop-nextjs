import Image from "next/image";
import { ScandiStore } from "../../../context/context";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import roundToTwoDecimalPlaces from "../atoms/roundToTwoFloat";

export default function Cart() {
  const router = useRouter();
  const {
    cart,
    currency,
    setCart,
    totalPrice,
    totalQuantity,
  } = useContext(ScandiStore);
  const [scandiCart, setScandiCart] = useState([]);

  function hasDuplicateObjects(array) {
    return array.some((item, index) =>
      array.some(
        (otherItem, otherIndex) =>
          index !== otherIndex && isEqual(item, otherItem)
      )
    );
  }

  function isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  const removeProduct = (item) => {
    setCart((prevCart) => {
      const indexToRemove = prevCart.findIndex(
        (element) => JSON.stringify(element) === JSON.stringify(item)
      );
      if (indexToRemove !== -1) {
        const updatedCart = [...prevCart];
        updatedCart.splice(indexToRemove, 1);
        return updatedCart;
      }
      return prevCart;
    });
  };

  const increaseProductQty = (item) => {
    const updatedCart = cart.map((element) => {
      if (JSON.stringify(element) === JSON.stringify(item)) {
        return { ...element, quantity: element.quantity + 1 };
      }
      return element;
    });
    setCart(updatedCart);
  };

  const decreaseProductQty = (item) => {
    const updatedCart = cart.map((element) => {
      if (JSON.stringify(element) === JSON.stringify(item)) {
        return {
          ...element,
          quantity: element.quantity < 2 ? 1 : element.quantity - 1,
        };
      }
      return element;
    });
    setCart(updatedCart);
  };

  useEffect(() => {
    setScandiCart(cart);
  }, [cart]);

  let key = 0;

  const handleProductAttr = (key, value, item) => {
    const updatedCart = cart.map((element) => {
      if (JSON.stringify(element) === JSON.stringify(item)) {
        return { ...element, [key]: value };
      }
      return element;
    });
    setCart(updatedCart);
  };

  const cartEl = scandiCart.map((item) => {
    key += 1;
    const price = item.prices?.find(
      (price) => price.currency.symbol === currency
    );
    const productFirstName = item.name[0];
    const productOtherNames = item.name.slice(1).join(" ");
    return (
      <section
        key={key}
        className="w-full mb-4 border-b-4 border-primary flex justify-between items-center"
      >
        <div>
          <section className="flex">
            <article>
              <h2 className="text-2xl">
                <span className="font-semibold block mb-2">{productFirstName}</span>
                <span>{productOtherNames}</span>
              </h2>
              <h3 className="font-RobotoCondensed font-bold my-2 text-lg">
                {currency}  {roundToTwoDecimalPlaces(price.amount * item.quantity)}
              </h3>
            </article>
          </section>
          {item.attributes?.map((attr) => (
            <ul className="relative bock" key={attr.id}>
              <li className="uppercase font-bold mt-7">{attr.name}:</li>
              <li>
                <ul className="flex flex-wrap w-full">
                  {attr.items.map((attrItem) => (
                    <li key={attrItem.id}>
                      {attr.type === "swatch" ? (
                        <div>
                          <button
                            onClick={() =>
                              handleProductAttr(attr.name, attrItem.value, item)
                            }
                            aria-label="Product Colors"
                            className={`w-10 h-10 border-2 flex justify-center items-center m-1 text-lg ${
                              item[attr.name] === attrItem.value
                                ? "border-primary"
                                : "border-transparent"
                            }`}
                            name={attr.name}
                            type="button"
                          >
                            <div
                              style={{
                                backgroundColor: attrItem.value,
                              }}
                              className="flex justify-center items-center m-1 absolute w-8 h-8 -z-10"
                            />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            handleProductAttr(attr.name, attrItem.value, item)
                          }
                          type="button"
                          name={attr.name}
                        >
                          <div
                              className={`font-SourceSans flex justify-center items-center border-2 border-black w-12 h-10 my-2 mx-2 -z-20 relative ${
                              item[attr.name] === attrItem.value
                                ? "bg-black text-white"
                                : "bg-white text-black"
                            }`}
                          >
                            {attrItem.value}
                          </div>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          ))}
        </div>
        <section className="flex flex-col items-center">
          <button
            onClick={() => {
              router.push(`/${item.productId}`);
            }}
          >
            <Image
              placeholder="blur"
              blurDataURL="/small-placeholder.png"
              className="w-40 h-40 object-contain -z-30 relative cursor-pointer"
              priority
              src={item.image}
              onClick={() => {
                useRouter;
              }}
              alt="product"
              width={170}
              height={170}
            />
          </button>
          <div className="flex justify-between items-center">
            <button
              onClick={() => decreaseProductQty(item)}
              className="text-xl font-semibold text-white rounded-sm bg-primary hover:bg-dark transition-all active:translate-y-1 px-3"
            >
              -
            </button>
            <p className="mx-4 font-Raleway text-3xl font-semibold">
              {item.quantity}
            </p>
            <button
              onClick={() => increaseProductQty(item)}
              className="text-xl font-semibold text-white rounded-sm bg-primary hover:bg-dark transition-all active:translate-y-1 px-3"
            >
              +
            </button>
          </div>
          <button
            className="flex p-1 items-center my-5 shadow-md shadow-overlay rounded-sm border-4 transition-all border-primary hover:border-red active:translate-y-1"
            type="button"
            onClick={() => removeProduct(item)}
          >
            <Image
              placeholder="blur"
              blurDataURL="/small-placeholder.png"
              className="w-6 h-6 object-contain -z-30 relative "
              src="/delete.png"
              alt="product"
              width={30}
              height={30}
            />
            <span className="font-semibold ml-2">remove item</span>
          </button>
        </section>
      </section>
    );
  });

  return (
    <>
      {hasDuplicateObjects(scandiCart) && (
        <p className="bg-red p-4 text-center tracking-wider text-xl w-full text-white border-b-4 border-primary uppercase font-bold mb-5 animate-bounce">
          Duplicate products found in cart, remove duplicates!
        </p>
      )}
      {cartEl}
      {
        scandiCart.length < 1 ? <h1>Oops! your cart is empty</h1> :
          <section className="font-medium text-xl">
            <h3 className="mb-2">Quantity: <span className="font-bold tracking-wider">{totalQuantity}</span></h3>
            <h3> Total: <span className="font-bold tracking-wider font-Roboto">{currency} {totalPrice}</span> </h3>
            <button className="bg-primary uppercase px-4 py-2 text-white my-5">Order</button>
      </section>
      }
    </>
  );
}
