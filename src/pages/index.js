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
      <Image width={500} height={500} className="w-96 h-96 object-contain" src={gallery[0]} alt={name} />
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
      <header className="mb-6 bg-primary p-6 text-center shadow-sm shadow-overlay rounded-br-3xl">
        <h2 className="font-bold text-7xl text-white mb-4">
          Welcome to Scandi-Shop 🎈🎈
        </h2>
        <h3 className="text-2xl font-bold mb-5">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-hoverBackground to-white">
            Shop with us today to get value for your money!
          </span>
        </h3></header>
      <main className="text-center px-8">
        <section className="flex">
          <section className="max-w-[30%] shadow-md shadow-dark h-[65vh] px-3 rounded-lg">
            <h3 className="xl tracking-wider my-4 font-semibold text-text">
              Browse our categories of products:
            </h3>
            <ul className="flex items-stretch flex-col">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    className="py-3 text-text mb-4 w-full uppercase border-b-2 border-light hover:opacity-100 transition-all opacity-70 hover:border-primary"
                    onClick={() =>
                      router.push(`/categories?filter=${category}`, undefined, {
                        shallow: true,
                      })
                    }
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section className="max-w-[60%] p-3 ml-4">
            <div className="flex justify-center max-h-fit">
              <Carousel
                showArrows={false}
                autoPlay={true}
                infiniteLoop={true}
                selectedItem={products[currentIndex]}
                onChange={handleChange}
                autoFocus={true}
                emulateTouch={true}
                stopOnHover={false}
                className="w-3/4 h-1/3"
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
