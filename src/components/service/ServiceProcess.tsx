import { useEffect, useRef, useState } from 'react'
import type { ServicePage } from '../../data/services'

interface Props {
  service: ServicePage
}

export default function ServiceProcess({ service }: Props) {
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
    <section ref={ref} className="py-20 md:py-28 bg-[#070707]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-label flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-DEFAULT inline-block" />
            Прозрачно и понятно
          </span>
          <h2 className="section-title">Этапы работы</h2>
        </div>

        {/* Desktop: stepped grid */}
        <div className="hidden lg:grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(service.processSteps.length, 3)}, 1fr)` }}>
          {service.processSteps.map((step, i) => (
            <div
              key={step.number}
              className={`group relative bg-[#101010] gold-border p-7 card-hover transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="flex items-start justify-between mb-5">
                <span
                  className="text-gold-DEFAULT"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '42px', fontWeight: 600, lineHeight: 1, opacity: 0.6 }}
                >
                  {step.number}
                </span>
                {/* Connector dot */}
                <div className="w-2 h-2 rounded-full bg-gold-DEFAULT opacity-30 group-hover:opacity-70 transition-opacity duration-300 mt-3" />
              </div>
              <h3
                className="text-[#F5F1E8] font-semibold mb-3 group-hover:text-gold-DEFAULT transition-colors duration-300"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px' }}
              >
                {step.title}
              </h3>
              <p className="text-[#A8A8A8] text-xs leading-relaxed">{step.description}</p>
              <div className="mt-5 w-0 h-px bg-gold-DEFAULT group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative pl-8">
          <div
            className="absolute left-3.5 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, rgba(214,168,79,0.4), rgba(214,168,79,0.05))' }}
          />
          <div className="space-y-8">
            {service.processSteps.map((step, i) => (
              <div
                key={step.number}
                className={`group relative transition-all duration-700 ${
                  visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
              >
                {/* Dot */}
                <div
                  className="absolute -left-8 top-1 w-7 h-7 flex items-center justify-center bg-[#101010]"
                  style={{ border: '1px solid rgba(214,168,79,0.4)' }}
                >
                  <span className="text-gold-DEFAULT text-[10px] font-bold">{step.number}</span>
                </div>
                <div className="bg-[#101010] gold-border p-5">
                  <h3
                    className="text-[#F5F1E8] font-semibold mb-2"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#A8A8A8] text-xs leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
