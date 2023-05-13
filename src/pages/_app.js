import "@/styles/globals.css";
import Header from "@/components/layout/Header.js";
import Context from "../../context/context";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [overlay, setOverlay] = useState(false);

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <div className={`${overlay && "bg-overlay z-50"}`}>
      <Context>
        <Header setOverlay={setOverlay} />
        <Component {...pageProps} />
      </Context>
    </div>
  );
}
