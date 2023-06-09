import { useRouter } from "next/router"
import store from "../../../data/store.json"
import Image from "next/image"
import { useState, useEffect } from "react"
import ImageMagnifier from "@/components/atoms/Magnifier"
import { ScandiStore } from "../../../context/context"
import { useContext } from "react"
import parse from "html-react-parser"
import AlertError from "../atoms/AlertError"
import AlertSuccess from "../atoms/AlertSuccess"

export default function Description() {
  const { currency, setCart } = useContext(ScandiStore)
  const router = useRouter()

  const product = store.data.categories[0].products.find(
    (product) => product.id === router.query.description
  )
  const [activeImage, setActiveImage] = useState("/large-placeholder.png")
  const productNameArr = product?.name.split(" ")
  const productFirstName = productNameArr && productNameArr[0]
  const productOtherNames = productNameArr && productNameArr.slice(1).join(" ")
  const price = product?.prices.find(
    (price) => price.currency.symbol === currency
  )
  const [attrState, setAttrState] = useState({
    productId: product?.id,
    image: product?.gallery[0],
    prices: product?.prices,
    name: productNameArr,
    quantity: 1,
  })

  const [itemExists, setItemExists] = useState(false)
  const [itemAdded, setItemAdded] = useState(false)
  const productAttributesLength = product?.attributes.length
  const attrStateLength = Object.keys(attrState).length

  useEffect(() => {
    product && setActiveImage(product?.gallery[0])
  }, [router.query.description])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setItemExists(false)
      setItemAdded(false)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [itemExists, itemAdded])

  const handleProductAttr = (key, value, attributes) => {
    setAttrState((prevState) => {
      return {
        ...prevState,
        [key]: value,
        attributes: attributes,
      }
    })
  }

  const handleCart = () => {
    setCart((prevCart) => {
      if (prevCart.length < 1) {
        itemExists && setItemExists(false)
        setItemAdded(true)
        return [...prevCart, attrState]
      } else {
        const prod = prevCart.find(
          (item) => JSON.stringify(item) === JSON.stringify(attrState)
        )
        if (prod) {
          itemAdded && setItemAdded(false)
          setItemExists(true)
          return prevCart
        } else {
          itemExists && setItemExists(false)
          setItemAdded(true)
          return [...prevCart, attrState]
        }
      }
    })
  }

  return (
    <>
      {itemExists && <AlertError>Item already exists in cart!</AlertError>}
      {itemAdded && (
        <AlertSuccess>Added item to cart successfully</AlertSuccess>
      )}
      <main className="flex flex-col md:p-14 p-3 font-Raleway text-primary md:flex-row w-full">
        <section className="md:w-1/4 w-full">
          <ul className="scrollbarX md:scrollbar md:h-[70vh] flex md:flex-col w-full">
            {product?.gallery.map((image) => (
              <li key={image}>
                <button
                  className="relative mb-2 w-32"
                  onClick={() => setActiveImage(image)}
                >
                  <Image
                    alt="product"
                    blurDataURL="/small-placeholder.png"
                    className="relative -z-30 h-3/4 w-3/4 object-contain mx-auto"
                    height={100}
                    placeholder="blur"
                    src={image}
                    width={100}
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section className="relative md:w-fit">
          <ImageMagnifier height={400} src={activeImage} width={500} />
          <Image
            alt="product"
            blurDataURL="/large-placeholder.png"
            className="relative -z-30 h-3/4 w-full object-contain md:hidden mx-auto my-4"
            height={300}
            placeholder="blur"
            src={activeImage}
            width={350}
          />
        </section>
        <section className="md:w-3/6">
          <h2 className="text-2xl">
            <span className="mb-4 block font-semibold text-secondary-focus">
              {productFirstName}
            </span>
            <span className="text-base-content">{productOtherNames}</span>
          </h2>
          {product?.attributes.map((attr) => (
            <ul className="relative" key={attr.id}>
              <li className="mt-7 font-bold uppercase text-base-content">
                {attr.name}:
              </li>
              <li>
                <ul className="flex w-full flex-wrap">
                  {attr.items.map((item) => (
                    <li key={item.id}>
                      {attr.type === "swatch" ? (
                        <div>
                          <button
                            aria-label="Product Colors"
                            className={`${attrState[attr.name] === item.value
                              ? "border-primary"
                              : "border-transparent"
                              } m-2 flex h-10 w-10 items-center justify-center border-2`}
                            name={attr.name}
                            onClick={() =>
                              handleProductAttr(
                                attr.name,
                                item.value,
                                product?.attributes,
                                product?.gallery
                              )
                            }
                            type="button"
                          >
                            <div
                              className="absolute -z-10 m-2 flex h-8 w-8 items-center justify-center"
                              style={{
                                backgroundColor: item.value,
                              }}
                            />
                          </button>
                        </div>
                      ) : (
                        <button
                          name={attr.name}
                          onClick={() =>
                            handleProductAttr(
                              attr.name,
                              item.value,
                              product?.attributes
                            )
                          }
                          type="button"
                        >
                          <div
                              className={`${attrState[attr.name] === item.value
                              ? "bg-black text-white"
                              : "bg-white text-black"
                              } relative -z-20 m-2 flex h-12 w-16 items-center justify-center border-2 border-black font-SourceSans`}
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
          <h3 className="mt-7 font-RobotoCondensed text-lg font-bold text-base-content">
            PRICE:
          </h3>
          <p className="font-RobotoCondensed text-2xl font-bold text-base-content">
            {currency} {price?.amount}
          </p>
          <button
            className="btn-primary btn mt-4 w-full disabled:opacity-60"
            disabled={
              !product?.inStock ||
              (productAttributesLength > 0 &&
                attrStateLength < productAttributesLength + 6)
            }
            onClick={handleCart}
            type="button"
          >
            {product?.inStock ? "ADD TO CART" : "OUT OF STOCK"}
          </button>
          <div className="scrollbar mb-3 mt-10 max-h-56 p-2 font-Roboto font-medium leading-6 tracking-wider text-base-content">
            {product && parse(product.description)}
          </div>
        </section>
      </main>
    </>
  )
}
