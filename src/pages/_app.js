import "@/styles/globals.css"
import Header from "@/components/layout/Header.js"
import Context from "../../context/context"
import { useEffect, useState } from "react"
import MobileMessage from "@/components/atoms/MobileMessage"

export default function App({ Component, pageProps }) {
  const [overlay, setOverlay] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768) // Adjust the breakpoint as per your needs
    }

    // Add event listener for window resize
    window.addEventListener("resize", handleResize)

    // Call handleResize on initial load
    handleResize()

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }
  return (
    <>
      {isMobile ? (
        <MobileMessage />
      ) : (
        <div className={`${overlay && "z-50 bg-overlay"}`}>
          <Context>
            <Header setOverlay={setOverlay} />
            <Component {...pageProps} />
          </Context>
        </div>
      )}
    </>
  )
}
