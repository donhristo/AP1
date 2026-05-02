import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Shield, Sparkles, Droplets, Car, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../data'

const icons = [Shield, Sparkles, Droplets, Car, Layers]

const slugMap: Record<string, string> = {
  ppf: 'ppf-zaschita',
  polish: 'polirovka',
  ceramic: 'keramika',
  interior: 'detailing-interiera',
  antichrome: 'antihrom',
}

export default function Services() {
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

  return (
    <section id="services" ref={ref} className="py-24 md:py-32 bg-[#070707]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-label flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-DEFAULT inline-block" />
            Что мы делаем
          </span>
          <h2 className="section-title">
            Направления нашей работы
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {services.map((service, i) => {
            const Icon = icons[i] ?? Shield
            const slug = slugMap[service.id] ?? service.id

            return (
              <Link
                key={service.id}
                to={`/services/${slug}`}
                onClick={() => window.scrollTo(0, 0)}
                className={`group relative bg-[#101010] gold-border overflow-hidden card-hover block transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(7,7,7,0.9) 0%, rgba(7,7,7,0.3) 60%, transparent 100%)' }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(214,168,79,0.05)' }}
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3 w-9 h-9 flex items-center justify-center border border-[rgba(214,168,79,0.3)] group-hover:border-gold-DEFAULT group-hover:bg-[rgba(214,168,79,0.1)] transition-all duration-300">
                    <Icon size={16} className="text-gold-DEFAULT" />
                  </div>
                  <h3
                    className="text-base font-semibold text-[#F5F1E8] mb-2 group-hover:text-gold-DEFAULT transition-colors duration-300"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-[#A8A8A8] text-xs leading-relaxed mb-4">{service.description}</p>

                  <div className="flex items-center gap-1 text-gold-DEFAULT opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                    <span className="text-xs tracking-widest uppercase font-medium">Подробнее</span>
                    <ArrowUpRight size={13} />
                  </div>
                </div>

                {/* Bottom gold line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-DEFAULT group-hover:w-full transition-all duration-500" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
