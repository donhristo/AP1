import { MapPin, Instagram, Send, MessageCircle } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { servicePages } from '../data/services'

const navLinks = [
  { label: 'Услуги',      hash: '#services' },
  { label: 'О студии',    hash: '#trust' },
  { label: 'Процесс',     hash: '#process' },
  { label: 'Наши работы', hash: '#portfolio' },
  { label: 'Контакты',    hash: '#booking' },
]

export default function Footer() {
  const location    = useLocation()
  const navigate    = useNavigate()
  const isOnLanding = location.pathname === '/'

  const handleNav = (hash: string) => {
    if (isOnLanding) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      sessionStorage.setItem('scrollTarget', hash)
      navigate('/')
    }
  }

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#050505', borderTop: '1px solid rgba(214,168,79,0.15)' }}
    >
      {/* Top section */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <span
                  className="text-4xl font-bold text-[#F5F1E8]"
                  style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.05em' }}
                >
                  AP
                </span>
                <div className="absolute -bottom-1 left-0 right-0 h-px bg-gold-DEFAULT opacity-70" />
              </div>
            </div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-gold-DEFAULT uppercase mb-1">Detailing Studio</p>
            <p className="text-[10px] tracking-[0.25em] text-[#555] uppercase mb-6">Москва</p>

            <a
              href="https://maps.google.com/?q=Москва,+1-й+Красногвардейский+проезд,+15"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-[#A8A8A8] text-xs leading-relaxed hover:text-gold-DEFAULT transition-colors duration-300 group"
            >
              <MapPin size={13} className="text-gold-DEFAULT shrink-0 mt-0.5" />
              <span>Москва, 1-й Красногвардейский проезд, 15<br />Москва-Сити</span>
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] text-gold-DEFAULT uppercase mb-6">Навигация</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.hash}>
                  <button
                    onClick={() => handleNav(link.hash)}
                    className="text-sm text-[#A8A8A8] hover:text-[#F5F1E8] transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] text-gold-DEFAULT uppercase mb-6">Услуги</h4>
            <ul className="space-y-3">
              {servicePages.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-sm text-[#A8A8A8] hover:text-[#F5F1E8] transition-colors duration-300"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts + Social */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] text-gold-DEFAULT uppercase mb-6">Контакты</h4>
            <a
              href="tel:+74951500027"
              className="block text-[#F5F1E8] text-base font-semibold hover:text-gold-DEFAULT transition-colors duration-300 mb-1"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              +7 (495) 150-00-27
            </a>
            <p className="text-[#555] text-xs mb-8">Ежедневно 10:00–22:00</p>

            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: 'Instagram',  href: 'https://instagram.com' },
                { icon: Send,      label: 'Telegram',   href: 'https://t.me' },
                { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/74951500027' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-[rgba(214,168,79,0.25)] text-[#A8A8A8] hover:border-gold-DEFAULT hover:text-gold-DEFAULT transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(214,168,79,0.1)' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#555] text-xs tracking-wide">
            © 2025 AP Detailing Studio. Все права защищены.
          </p>
          <p className="text-[#555] text-xs tracking-wide">
            Премиальный детейлинг в Москве
          </p>
        </div>
      </div>
    </footer>
  )
}
