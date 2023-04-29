import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Context from '@/context/context'

export default function App({Component, pageProps}) {
  return (
    <>
      <Context>
        <Header />
        <Component {...pageProps} />
      </Context>
    </>
  )
}
