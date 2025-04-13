import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '@/components/Footbar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="layout">
      <Navbar />
        <main className="main-content">

          <Component {...pageProps} />
        </main>
        <Footer />
        </div>
    </>
  );
}
