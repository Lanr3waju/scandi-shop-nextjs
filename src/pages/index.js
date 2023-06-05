import Head from "next/head"
import { useRouter } from "next/router"
import { categories } from "@/components/layout/Header"
import React, { useState } from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import store from "../../data/store.json"
import Image from "next/image"

export default function Homepage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState()

  const { products } = store.data.categories.find(({ name }) => name === "all")

  const renderSlides = products.map(({ gallery, name, id }) => (
    <div key={id}>
      <Image
        alt={name}
        className="h-96 w-96 object-contain"
        height={500}
        src={gallery[0]}
        width={500}
      />
    </div>
  ))

  function handleChange(index) {
    setCurrentIndex(index)
  }

  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <header className="mb-6 rounded-br-3xl bg-primary p-6 text-center shadow-sm shadow-overlay ">
        <h2 className="mb-4 text-7xl font-bold text-white">
          Welcome to Scandi-Shop 🎈
        </h2>
        <h3 className="mb-5 text-2xl font-bold">
          <span className="text-base">
            Shop with us today to get value for your money!
          </span>
        </h3>
      </header>
      <main className="px-8 text-center">
        <section className="flex">
          <section className="h-[65vh] max-w-[30%] rounded-lg px-3 shadow-md shadow-dark">
            <h3 className="my-4 text-base font-semibold tracking-wider">
              Browse our categories of products:
            </h3>
            <ul className="flex flex-col items-stretch">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    className="mb-4 w-full border-b-2 border-light py-3 uppercase text-secondary opacity-70 transition-all hover:border-primary hover:opacity-100"
                    onClick={() =>
                      router.push(`/categories?filter=${category}`, undefined, {
                        shallow: true,
                      })
                    }
                    type="button"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section className="ml-4 max-w-[60%] p-3">
            <div className="flex max-h-fit justify-center">
              <Carousel
                autoFocus={true}
                autoPlay={true}
                className="h-1/3 w-3/4"
                emulateTouch={true}
                infiniteLoop={true}
                onChange={handleChange}
                selectedItem={products[currentIndex]}
                showArrows={false}
                showThumbs={false}
                stopOnHover={false}
              >
                {renderSlides}
              </Carousel>
            </div>
          </section>
        </section>
      </main>
    </>
  )
}

Homepage.getLayout = function PageLayout(page) {
  return <>{page}</>
}
