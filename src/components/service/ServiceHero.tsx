import { ArrowRight, ChevronRight, Clock, Shield, Wrench, Star } from 'lucide-react'
import type { ServicePage } from '../../data/services'

const badgeIcons = [Clock, Shield, Wrench, Star]

interface Props {
  service: ServicePage
}

export default function ServiceHero({ service }: Props) {
  const scrollToForm = () => {
    document.querySelector('#service-cta')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#050505]" style={{ paddingTop: '80px' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <div
          className="absolute right-0 top-0 w-full lg:w-[55%] h-full"
          style={{
            backgroundImage: `url(${service.heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #050505 0%, rgba(5,5,5,0.88) 30%, rgba(5,5,5,0.25) 70%, rgba(5,5,5,0.05) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #050505 0%, transparent 40%)' }} />
        </div>
        <div
          className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(214,168,79,0.05) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full py-16">
        <div className="max-w-[580px]">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-[11px] tracking-widest text-[#555] uppercase">
            <a href="/" className="hover:text-gold-DEFAULT transition-colors duration-200">Главная</a>
            <ChevronRight size={10} />
            <span className="text-[#A8A8A8]">Услуги</span>
            <ChevronRight size={10} />
            <span className="text-gold-DEFAULT">{service.title}</span>
          </nav>

          {/* Label */}
          <span className="section-label flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-gold-DEFAULT inline-block" />
            AP Service
          </span>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#F5F1E8',
            }}
          >
            {service.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-[#A8A8A8] text-sm leading-relaxed max-w-[460px]">
            {service.subtitle}
          </p>

          {/* Divider */}
          <div className="mt-7 w-10 h-px bg-gold-DEFAULT" style={{ opacity: 0.7 }} />

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap gap-4">
            <button onClick={scrollToForm} className="btn-primary">
              Рассчитать стоимость
              <ArrowRight size={15} />
            </button>
            <button onClick={scrollToForm} className="btn-outline">
              Получить консультацию
            </button>
          </div>

          {/* Badges */}
          <div className="mt-10 grid grid-cols-2 gap-3">
            {service.badges.map((badge, i) => {
              const Icon = badgeIcons[i] ?? Clock
              return (
                <div
                  key={badge.label}
                  className="flex items-center gap-3 bg-[#0d0d0d] px-4 py-3"
                  style={{ border: '1px solid rgba(214,168,79,0.2)' }}
                >
                  <Icon size={14} className="text-gold-DEFAULT shrink-0" />
                  <div>
                    <p className="text-[9px] tracking-[0.2em] text-[#555] uppercase">{badge.label}</p>
                    <p className="text-[#F5F1E8] text-xs font-medium mt-0.5">{badge.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #050505, transparent)' }}
      />
    </section>
  )
}
