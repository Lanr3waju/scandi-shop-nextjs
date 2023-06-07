import { useRouter } from "next/router"
import { categories } from "@/components/layout/Header"
import { useState } from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import Image from "next/image"

export default function Homepage({ store }) {
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
      <header className="mb-6 rounded-br-3xl bg-primary p-6 text-center shadow-sm shadow-overlay ">
        <h2 className="mb-4 text-5xl md:text-7xl font-bold text-white font-Raleway">
          Welcome to Scandi-Shop 🎈
        </h2>
        <h3 className="my-5 text-xl font-bold text-primary-content font-Inter">
          Shop with us today to get value for your money!
        </h3>
      </header>
      <main className="md:px-8 text-center">
        <section className="flex flex-col md:flex-row">
          <section className="md:h-[65vh] md:max-w-[30%] rounded-lg px-3 shadow-lg md:shadow-md md:shadow-dark">
            <h3 className="my-4 md:text-base text-xl font-semibold tracking-wider">
              Browse our categories of products:
            </h3>
            <ul className="flex md:flex-col justify-around md:items-stretch">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    className="mb-4 w-full text-lg md:text-base border-b-2 border-secondary py-3 uppercase text-primary-content md:opacity-70 transition-all hover:border-primary hover:opacity-100"
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
          <section className="md:ml-4 md:max-w-[60%] p-3 mt-2">
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
