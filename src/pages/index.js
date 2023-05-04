import Head from 'next/head';
import { useRouter } from 'next/router';
import { categories } from '@/components/layout/Header';
import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import store from '../../data/store.json';


export default function Homepage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState();
  const { products } = store.data.categories.find(({ name }) => name === 'all');

  function handleChange(index) {
    setCurrentIndex(index);
  }

  const renderSlides = products.map(({ gallery, name, id }) => (
    <div key={ id }>
      <img src={ gallery[0] } alt={ name } />
      <p>{ name }</p>
    </div>
  ));

  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <main className='text-center px-8'>
        <h2 className='font-bold text-7xl text-primary m-6'>Welcome to Scandi-Shop</h2>
        <h3 className='text-2xl font-bold mb-5'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-primary via-dark to-primary'>Shop with us today to get value for your money!</span>
        </h3>
        <section className='flex'>
          <section className='max-w-[30%] shadow-md shadow-dark h-screen px-3 rounded-lg'>
            <h3 className='xl tracking-wider my-4 font-semibold text-text'>Browse our categories of products:</h3>
            <ul className='flex items-stretch flex-col'>
              { categories.map((category) => (
                <li key={ category }>
                  <button
                    type="button"
                    className='py-3 text-text mb-4 w-full uppercase border-b-2 border-light hover:opacity-100 transition-all opacity-70 hover:border-primary'
                    onClick={ () => router.push(`/categories?filter=${ category }`, undefined, { shallow: true }) }
                  >
                    { category }
                  </button>
                </li>
              )) }
            </ul>
          </section>
          <section className='max-w-[60%] p-3 flex flex-col justify-center ml-4'>
            <div className="flex justify-center max-h-fit">
              <Carousel
                showArrows={ true }
                autoPlay={ true }
                infiniteLoop={ true }
                selectedItem={ products[currentIndex] }
                onChange={ handleChange }
                autoFocus={ true }
                emulateTouch={ true }
                stopOnHover={ false }
                className="w-2/4 h-1/3"
              >
                { renderSlides }
              </Carousel>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

Homepage.getLayout = function PageLayout(page) {
  return (
    <>
      { page }
    </>
  );
};
