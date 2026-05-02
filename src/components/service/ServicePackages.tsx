import { useEffect, useRef, useState } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import type { ServicePage } from '../../data/services'

interface Props {
  service: ServicePage
}

export default function ServicePackages({ service }: Props) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const scrollToForm = () => {
    document.querySelector('#service-cta')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section ref={ref} className="py-20 md:py-28" style={{ background: '#0a0a0a' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-label flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-DEFAULT inline-block" />
            Форматы работы
          </span>
          <h2 className="section-title">Пакеты услуги</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {service.packages.map((pkg, i) => (
            <div
              key={pkg.name}
              className={`relative flex flex-col transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${pkg.recommended
                ? 'bg-[#111008]'
                : 'bg-[#101010]'
              }`}
              style={{
                border: pkg.recommended
                  ? '1px solid rgba(214,168,79,0.55)'
                  : '1px solid rgba(214,168,79,0.2)',
                boxShadow: pkg.recommended ? '0 0 40px rgba(214,168,79,0.08)' : 'none',
                transitionDelay: `${0.1 + i * 0.1}s`,
              }}
            >
              {/* Recommended badge */}
              {pkg.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold-DEFAULT text-[#070707] text-[10px] font-bold tracking-[0.2em] uppercase whitespace-nowrap">
                  Рекомендуем
                </div>
              )}

              {/* Header */}
              <div className="p-7 pb-5" style={{ borderBottom: '1px solid rgba(214,168,79,0.15)' }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-[10px] tracking-[0.25em] text-gold-DEFAULT uppercase font-semibold mb-1">{pkg.name}</p>
                    <h3
                      className="text-[#F5F1E8] font-semibold"
                      style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px' }}
                    >
                      {pkg.subtitle}
                    </h3>
                  </div>
                </div>
                <p className="text-[#A8A8A8] text-xs leading-relaxed">{pkg.description}</p>
              </div>

              {/* Features */}
              <div className="p-7 pt-5 flex-1">
                <ul className="space-y-3 mb-7">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <div className="w-4 h-4 shrink-0 flex items-center justify-center mt-0.5">
                        <Check size={11} className="text-gold-DEFAULT" />
                      </div>
                      <span className="text-[#A8A8A8] text-xs leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Duration & price */}
                <div className="flex items-end justify-between mt-auto pt-5" style={{ borderTop: '1px solid rgba(214,168,79,0.12)' }}>
                  <div>
                    <p className="text-[9px] tracking-widest text-[#555] uppercase mb-1">Срок</p>
                    <p className="text-[#A8A8A8] text-xs">{pkg.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] tracking-widest text-[#555] uppercase mb-1">Стоимость</p>
                    <p
                      className="text-gold-DEFAULT font-semibold"
                      style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px' }}
                    >
                      {pkg.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="px-7 pb-7">
                <button
                  onClick={scrollToForm}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 ${
                    pkg.recommended
                      ? 'bg-gold-DEFAULT text-[#070707] hover:bg-[#E8C47A]'
                      : 'border border-[rgba(214,168,79,0.35)] text-gold-DEFAULT hover:border-gold-DEFAULT hover:bg-[rgba(214,168,79,0.06)]'
                  }`}
                >
                  Выбрать пакет <ArrowRight size={13} />
                </button>
              </div>

              {/* Bottom gold line for recommended */}
              {pkg.recommended && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-DEFAULT" style={{ opacity: 0.5 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
