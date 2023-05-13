import Head from "next/head";
import Description from "@/components/organisms/Description";



export default function DescriptionPage() {
  return (
    <>
      <Head>
        <title>Description Page</title>
      </Head>
      <main className="flex p-14 font-Raleway text-text">
        <Description />
      </main>
    </>
  );
}
