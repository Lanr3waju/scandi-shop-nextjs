import Image from "next/image"
import { ScandiStore } from "../../../context/context"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import AlertError from "../atoms/AlertError"
import AlertSuccess from "../atoms/AlertSuccess"
import Modal from "../atoms/Modal"

export default function Cart() {
  const router = useRouter()
  const { cart, currency, setCart, totalPrice, totalQuantity } =
    useContext(ScandiStore)
  const [scandiCart, setScandiCart] = useState([])
  const [itemRemoved, setItemRemoved] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setItemRemoved(false)
    }, 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [itemRemoved])

  function hasDuplicateObjects(array) {
    return array.some((item, index) =>
      array.some(
        (otherItem, otherIndex) =>
          index !== otherIndex && isEqual(item, otherItem)
      )
    )
  }

  function isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
  }

  const removeProduct = (item) => {
    setCart((prevCart) => {
      const indexToRemove = prevCart.findIndex(
        (element) => JSON.stringify(element) === JSON.stringify(item)
      )
      if (indexToRemove !== -1) {
        const updatedCart = [...prevCart]
        updatedCart.splice(indexToRemove, 1)
        return updatedCart
      }
      return prevCart
    })
    setItemRemoved(true)
  }

  const increaseProductQty = (item) => {
    const updatedCart = cart.map((element) => {
      if (JSON.stringify(element) === JSON.stringify(item)) {
        return {
          ...element,
          quantity: element.quantity > 9 ? 10 : element.quantity + 1,
        }
      }
      return element
    })
    setCart(updatedCart)
  }

  const decreaseProductQty = (item) => {
    const updatedCart = cart.map((element) => {
      if (JSON.stringify(element) === JSON.stringify(item)) {
        return {
          ...element,
          quantity: element.quantity < 2 ? 1 : element.quantity - 1,
        }
      }
      return element
    })
    setCart(updatedCart)
  }

  useEffect(() => {
    setScandiCart(cart)
  }, [cart])

  let key = 0

  const handleProductAttr = (key, value, item) => {
    const updatedCart = cart.map((element) => {
      if (JSON.stringify(element) === JSON.stringify(item)) {
        return { ...element, [key]: value }
      }
      return element
    })
    setCart(updatedCart)
  }

  const cartEl = scandiCart.map((item) => {
    key += 1
    const price = item.prices?.find(
      (price) => price.currency.symbol === currency
    )
    const productFirstName = item.name[0]
    const productOtherNames = item.name.slice(1).join(" ")
    return (
        <section
          className="mb-4 flex w-full items-center justify-between border-b-4 border-primary"
          key={key}
        >
          <div>
            <section className="flex">
              <article>
                <h2 className="text-xl">
                  <span className="mb-2 font-semibold text-secondary">
                    {productFirstName}
                  </span>{" "}
                  <span className="text-primary-content">
                    {productOtherNames}
                  </span>
                </h2>
                <h3 className="my-2 font-RobotoCondensed text-lg font-bold text-base-content">
                  {currency} {price.amount}
                </h3>
              </article>
            </section>
            {item.attributes?.map((attr) => (
              <ul className="relative" key={attr.id}>
                <li className="mt-7 font-bold uppercase text-primary-content">
                  {attr.name}:
                </li>
                <li>
                  <ul className="flex w-full flex-wrap">
                    {attr.items.map((attrItem) => (
                      <li key={attrItem.id}>
                        {attr.type === "swatch" ? (
                          <div>
                            <button
                              aria-label="Product Colors"
                              className={`m-1 flex h-10 w-10 items-center justify-center border-2 text-lg ${item[attr.name] === attrItem.value
                                ? "border-primary"
                                : "border-transparent"
                                }`}
                              name={attr.name}
                              onClick={() =>
                                handleProductAttr(
                                  attr.name,
                                  attrItem.value,
                                  item
                                )
                              }
                              type="button"
                            >
                              <div
                                className="absolute -z-10 m-1 flex h-8 w-8 items-center justify-center"
                                style={{
                                  backgroundColor: attrItem.value,
                                }}
                              />
                            </button>
                          </div>
                        ) : (
                          <button
                              name={attr.name}
                            onClick={() =>
                              handleProductAttr(attr.name, attrItem.value, item)
                            }
                              type="button"
                          >
                            <div
                                className={`${item[attr.name] === attrItem.value
                                  ? "bg-black text-white"
                                  : "bg-white text-black"
                                  } relative -z-20 m-2 flex h-10 w-12 items-center justify-center border-2 border-black font-SourceSans`}
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
            <div className="flex items-center justify-between">
              <button
                className="rounded-sm bg-primary px-3 text-xl font-semibold text-white transition-all hover:bg-dark active:translate-y-1"
                onClick={() => decreaseProductQty(item)}
              >
                -
              </button>
              <p className="mx-4 font-Raleway text-3xl font-semibold text-secondary">
                {item.quantity}
              </p>
              <button
                className="rounded-sm bg-primary px-3 text-xl font-semibold text-white transition-all hover:bg-dark active:translate-y-1"
                onClick={() => increaseProductQty(item)}
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                router.push(`/${item.productId}`)
              }}
            >
              <Image
                alt="product"
                blurDataURL="/small-placeholder.png"
                className="relative -z-30 h-40 w-40 cursor-pointer object-contain"
                height={170}
                onClick={() => {
                  useRouter
                }}
                placeholder="blur"
                priority
                src={item.image}
                width={170}
              />
            </button>
            <button
              className="btn-error btn-outline btn my-2 py-1 lowercase"
              onClick={() => removeProduct(item)}
              type="button"
            >
              remove Item
            </button>
          </section>
      </section>
    )
  })

  return (
    <>
      {hasDuplicateObjects(scandiCart) && (
        <AlertError>
          Duplicate products found in cart, remove duplicates!
        </AlertError>
      )}
      {cartEl}
      {scandiCart.length < 1 ? (
        <h1 className="text-error-content">Oops! your cart is empty</h1>
      ) : (
        <>
          {itemRemoved && (
            <AlertSuccess>Item removed successfully</AlertSuccess>
          )}
            <section className="text-xl font-medium">
            <h3 className="mb-2 text-secondary">
              Quantity:{" "}
                <span className="font-RobotoCondensed font-bold tracking-wider text-primary-content">
                {totalQuantity}
              </span>
            </h3>
            <h3 className="text-secondary">
              {" "}
              Total:{" "}
                <span className="font-RobotoCondensed font-bold tracking-wider text-primary-content">
                {currency} {totalPrice}
              </span>{" "}
            </h3>
            <button
                className="btn-primary btn mt-4 w-1/4 text-xl "
              onClick={() => window.my_modal_1.showModal()}
            >
              Order
            </button>
            <Modal>
              <h2>
                You have ordered a total of{" "}
                  <span className="font-RobotoCondensed font-bold text-secondary">
                  {totalQuantity}
                </span>{" "}
                  item(s) which cost(s) a total of{" "}
                  <span className="font-RobotoCondensed font-bold text-secondary">
                  {" "}
                    {currency}{totalPrice}
                </span>
              </h2>
              <p>
                Your delivery will be made within 4 - 7 business days depending
                on your location and our dispatch will get in touch to you.
              </p>
              <p>
                We currently do not support online payments, so please bear with
                us and prepare the sum of{" "}
                  <span className="font-RobotoCondensed font-bold text-secondary">
                  {" "}
                    {currency}{totalPrice}
                </span>{" "}
                to pay on delivery
              </p>
              <h3>Thanks for your patronage 🎉🎊</h3>
            </Modal>
          </section>
        </>
      )}
    </>
  )
}
