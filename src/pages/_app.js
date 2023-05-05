import "@/styles/globals.css";
import Header from "@/components/layout/Header.js";
import Context from "../../context/context";


export default function App({ Component, pageProps }) {

  if (Component.getLayout)
  {
    return Component.getLayout(<Component { ...pageProps } />);
  }
  return (
    <Context>
      <>
        <Header />
        <Component { ...pageProps } />
      </>
    </Context>
  );
}
