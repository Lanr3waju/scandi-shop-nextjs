import Head from "next/head";
import { useRouter } from "next/router";
import store from "../../../data/store.json";
import Image from "next/image";
import { useState, useEffect } from "react";
import ImageMagnifier from "@/components/Magnifier";

export default function DescriptionPage() {
  const router = useRouter();
  const product = store.data.categories[0].products.find(
    (product) => product.id === router.query.description
  );
  const [activeImage, setActiveImage] = useState("/placeholder.png");

  useEffect(() => {
    product && setActiveImage(product?.gallery[0]);
  }, [router.query.description]);

  return (
    <>
      <Head>
        <title>Description Page</title>
      </Head>
      <main className="flex p-14">
        <section className="w-1/4">
          <ul className="w-full">
            {product?.gallery.map((image) => (
              <li key={image}>
                <button className="mb-4" onClick={() => setActiveImage(image)}>
                  <Image
                    placeholder="blur"
                    blurDataURL="/small-placeholder.png"
                    className="w-24 h-24 object-contain"
                    src={image}
                    alt="product"
                    width={96}
                    height={96}
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section className="w-full">
          <ImageMagnifier src={activeImage} width={600} height={500} />
        </section>
        <section className="w-1/3">
          <h1>{router.query.description}</h1>
        </section>
      </main>
    </>
  );
}
