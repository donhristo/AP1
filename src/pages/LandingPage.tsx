import { useEffect } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Process from '../components/Process'
import Portfolio from '../components/Portfolio'
import Trust from '../components/Trust'
import BookingForm from '../components/BookingForm'
import Footer from '../components/Footer'

export default function LandingPage() {
  // Handle scroll target set by Header navigation from service pages
  useEffect(() => {
    const target = sessionStorage.getItem('scrollTarget')
    if (target) {
      sessionStorage.removeItem('scrollTarget')
      const id = setInterval(() => {
        const el = document.querySelector(target)
        if (el) {
          clearInterval(id)
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 80)
      // safety cleanup after 2s
      setTimeout(() => clearInterval(id), 2000)
    }
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#070707' }}>
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <Trust />
        <BookingForm />
      </main>
      <Footer />
    </div>
  )
}
