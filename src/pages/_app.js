import '@/styles/globals.css';
import Header from '@/components/layout/Header.js';

export default function App({Component, pageProps}) {
  return (
    <>
        <Header />
      <Component {...pageProps} />
    </>
  );
}
