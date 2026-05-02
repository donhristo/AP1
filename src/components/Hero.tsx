import { useEffect, useRef, useState } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'

export default function Hero() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleScroll = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#070707]"
      style={{ paddingTop: '80px' }}
    >
      {/* Background image — right side */}
      <div className="absolute inset-0">
        <div
          className="absolute right-0 top-0 w-full lg:w-[58%] h-full"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay gradients */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #070707 0%, rgba(7,7,7,0.85) 30%, rgba(7,7,7,0.3) 60%, rgba(7,7,7,0.1) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #070707 0%, transparent 40%)' }} />
        </div>

        {/* Golden ambient glow */}
        <div
          className="absolute right-[5%] top-[30%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(214,168,79,0.06) 0%, transparent 70%)' }}
        />
      </div>

      {/* Large AP watermark */}
      <div
        className="absolute right-[8%] top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(200px, 20vw, 320px)',
          fontWeight: 700,
          color: 'rgba(214,168,79,0.04)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        AP
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
        <div className="max-w-[600px]">
          {/* Label */}
          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <span className="section-label flex items-center gap-3">
              <span className="w-8 h-px bg-gold-DEFAULT inline-block" />
              Детейлинг-студия AP — Москва
            </span>
          </div>

          {/* Main heading */}
          <div
            className={`mt-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '0.25s' }}
          >
            <h1
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(52px, 7vw, 96px)',
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#F5F1E8',
              }}
            >
              Совершенство
              <br />
              <em style={{ color: '#D6A84F', fontStyle: 'italic' }}>в каждой детали</em>
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`mt-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '0.4s' }}
          >
            <p className="text-[#A8A8A8] text-base leading-relaxed max-w-[440px]" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Премиальный уход и защита вашего автомобиля с использованием лучших материалов и технологий. Безупречный результат. Эстетика. Долговечность.
            </p>
          </div>

          {/* Divider */}
          <div
            className={`mt-8 w-12 h-px bg-gold-DEFAULT transition-all duration-700 ${visible ? 'opacity-100 w-12' : 'opacity-0 w-0'}`}
            style={{ transitionDelay: '0.5s' }}
          />

          {/* Buttons */}
          <div
            className={`mt-8 flex flex-wrap gap-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '0.55s' }}
          >
            <button onClick={() => handleScroll('#booking')} className="btn-primary">
              Рассчитать стоимость
              <ArrowRight size={15} />
            </button>
            <button onClick={() => handleScroll('#portfolio')} className="btn-outline">
              Смотреть проекты
            </button>
          </div>

          {/* Address */}
          <div
            className={`mt-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '0.7s' }}
          >
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#A8A8A8] hover:text-gold-DEFAULT transition-colors duration-300 group w-fit"
            >
              <MapPin size={14} className="text-gold-DEFAULT shrink-0" />
              <span className="text-sm tracking-wide">Москва, ул. Ленинская Слобода, 26</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #070707, transparent)' }}
      />

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: '1s' }}
      >
        <span className="text-[10px] tracking-[0.25em] text-[#A8A8A8] uppercase">Прокрутить</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold-DEFAULT to-transparent animate-pulse" />
      </div>
    </section>
  )
}
