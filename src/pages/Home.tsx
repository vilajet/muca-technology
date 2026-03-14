import Navbar from '../components/public/Navbar'
import Hero from '../components/public/Hero'
import Services from '../components/public/Services'
import About from '../components/public/About'
import Contact from '../components/public/Contact'
import Footer from '../components/public/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
