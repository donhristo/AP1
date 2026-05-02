import { useEffect, useRef, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import type { ServicePage } from '../../data/services'

interface Props {
  service: ServicePage
}

export default function ServiceIncluded({ service }: Props) {
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
    <section ref={ref} className="py-20 md:py-28" style={{ background: '#0a0a0a' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-label flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-DEFAULT inline-block" />
            В стоимость включено
          </span>
          <h2 className="section-title">Что входит в работу</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {service.included.map((item, i) => (
            <div
              key={item}
              className={`group flex items-center gap-4 bg-[#101010] gold-border p-5 card-hover transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${0.05 + i * 0.06}s` }}
            >
              <div
                className="w-8 h-8 shrink-0 flex items-center justify-center transition-all duration-300 group-hover:bg-[rgba(214,168,79,0.1)]"
                style={{ border: '1px solid rgba(214,168,79,0.25)' }}
              >
                <CheckCircle size={14} className="text-gold-DEFAULT" />
              </div>
              <span className="text-[#A8A8A8] text-xs leading-snug group-hover:text-[#F5F1E8] transition-colors duration-300">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
