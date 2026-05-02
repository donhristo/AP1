import { useState, useEffect, useRef } from 'react'
import { Phone, Menu, X, ArrowRight, ChevronDown, ArrowLeft } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { servicePages } from '../data/services'

const serviceLinks = servicePages.map((s) => ({ label: s.title, slug: s.slug }))

const navItems = [
  { label: 'О студии',  hash: '#trust' },
  { label: 'Процесс',   hash: '#process' },
  { label: 'Работы',    hash: '#portfolio' },
  { label: 'Контакты',  hash: '#booking' },
]

export default function Header() {
  const [scrolled, setScrolled]           = useState(false)
  const [mobileOpen, setMobileOpen]       = useState(false)
  const [servicesOpen, setServicesOpen]   = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location    = useLocation()
  const navigate    = useNavigate()
  const isOnLanding = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Scroll to section, or navigate home first and then scroll
  const scrollTo = (hash: string) => {
    setMobileOpen(false)
    if (isOnLanding) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      sessionStorage.setItem('scrollTarget', hash)
      navigate('/')
    }
  }

  const handleBooking = () => {
    scrollTo('#booking')
  }

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      navigate('/')
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isOnLanding
          ? 'bg-[#070707]/97 backdrop-blur-md border-b border-[rgba(214,168,79,0.12)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">

          {/* Back button — only on service pages */}
          {!isOnLanding && (
            <button
              onClick={handleGoBack}
              className="hidden lg:flex items-center gap-1.5 text-[#A8A8A8] hover:text-gold-DEFAULT transition-colors duration-300 mr-4 text-[11px] tracking-[0.1em] uppercase font-medium"
            >
              <ArrowLeft size={13} />
              Назад
            </button>
          )}

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <span
                className="text-3xl font-bold tracking-tight text-[#F5F1E8] group-hover:text-gold-DEFAULT transition-colors duration-300"
                style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.05em' }}
              >
                AP
              </span>
              <div className="absolute -bottom-1 left-0 right-0 h-px bg-gold-DEFAULT opacity-70" />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-[10px] font-semibold tracking-[0.2em] text-gold-DEFAULT uppercase">Detailing Studio</span>
              <span className="text-[9px] tracking-[0.25em] text-[#A8A8A8] uppercase mt-0.5">Москва</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {/* Services dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                onClick={() => setServicesOpen((v) => !v)}
                className={`flex items-center gap-1 text-[11px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 relative group ${
                  location.pathname.startsWith('/services') ? 'text-gold-DEFAULT' : 'text-[#A8A8A8] hover:text-[#F5F1E8]'
                }`}
              >
                Услуги
                <ChevronDown size={11} className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute -bottom-1 left-0 h-px bg-gold-DEFAULT transition-all duration-300 ${location.pathname.startsWith('/services') ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>

              <div
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                className={`absolute top-full left-0 pt-4 transition-all duration-300 ${servicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                style={{ minWidth: '240px' }}
              >
                <div
                  className="bg-[#0d0d0d] py-2"
                  style={{ border: '1px solid rgba(214,168,79,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}
                >
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.slug}
                      to={`/services/${link.slug}`}
                      onClick={() => { setServicesOpen(false); window.scrollTo(0, 0) }}
                      className="flex items-center px-5 py-3 text-[11px] tracking-[0.12em] text-[#A8A8A8] uppercase hover:text-gold-DEFAULT hover:bg-[rgba(214,168,79,0.04)] transition-all duration-200 group"
                    >
                      <span className="w-0 h-px bg-gold-DEFAULT mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navItems.map(({ label, hash }) => (
              <button
                key={label}
                onClick={() => scrollTo(hash)}
                className="text-[11px] font-medium tracking-[0.15em] text-[#A8A8A8] uppercase hover:text-[#F5F1E8] transition-colors duration-300 relative group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-DEFAULT group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="text-right">
              <a href="tel:+74951500027" className="flex items-center gap-2 text-[#F5F1E8] hover:text-gold-DEFAULT transition-colors duration-300">
                <Phone size={13} className="text-gold-DEFAULT" />
                <span className="text-sm font-semibold tracking-wide">+7 (495) 150-00-27</span>
              </a>
              <p className="text-[10px] text-[#A8A8A8] tracking-wider mt-0.5">Ежедневно 10:00–22:00</p>
            </div>
            <button onClick={handleBooking} className="btn-primary text-[11px] tracking-[0.2em]">
              Записаться <ArrowRight size={14} />
            </button>
          </div>

          {/* Burger */}
          <button
            className="lg:hidden p-2 text-[#F5F1E8] hover:text-gold-DEFAULT transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-400 overflow-hidden ${mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: 'rgba(7,7,7,0.98)', backdropFilter: 'blur(20px)' }}
      >
        <div className="px-6 py-6 border-t border-[rgba(214,168,79,0.12)]">
          <nav className="flex flex-col gap-1 mb-6">
            {/* Back button in mobile */}
            {!isOnLanding && (
              <button
                onClick={() => { setMobileOpen(false); handleGoBack() }}
                className="flex items-center gap-2 py-3 text-sm font-medium tracking-[0.1em] text-[#A8A8A8] uppercase hover:text-gold-DEFAULT transition-colors"
              >
                <ArrowLeft size={14} />
                Назад
              </button>
            )}

            {/* Services accordion in mobile */}
            <button
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="flex items-center justify-between py-3 text-sm font-medium tracking-[0.15em] text-[#A8A8A8] uppercase hover:text-gold-DEFAULT transition-colors"
            >
              Услуги
              <ChevronDown size={13} className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 pb-2 flex flex-col gap-2">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.slug}
                    to={`/services/${link.slug}`}
                    onClick={() => { setMobileOpen(false); window.scrollTo(0, 0) }}
                    className="text-xs text-[#A8A8A8] hover:text-gold-DEFAULT tracking-widest uppercase py-1 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {navItems.map(({ label, hash }) => (
              <button
                key={label}
                onClick={() => scrollTo(hash)}
                className="text-left py-3 text-sm font-medium tracking-[0.15em] text-[#A8A8A8] uppercase hover:text-gold-DEFAULT transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="gold-border-top pt-5 flex flex-col gap-4">
            <a href="tel:+74951500027" className="flex items-center gap-2 text-[#F5F1E8]">
              <Phone size={14} className="text-gold-DEFAULT" />
              <span className="text-sm font-semibold">+7 (495) 150-00-27</span>
            </a>
            <button onClick={handleBooking} className="btn-primary justify-center text-[11px] tracking-[0.2em]">
              Записаться <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
