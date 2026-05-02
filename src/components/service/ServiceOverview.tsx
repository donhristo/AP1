import { useEffect, useRef, useState } from 'react'
import { AlertCircle } from 'lucide-react'
import type { ServicePage } from '../../data/services'

interface Props {
  service: ServicePage
}

export default function ServiceOverview({ service }: Props) {
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
    <section ref={ref} className="py-20 md:py-28" style={{ background: '#070707' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div
          className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="section-label flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-DEFAULT inline-block" />
            Зачем это нужно
          </span>
          <h2 className="section-title">Что решает услуга</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {service.problems.map((problem, i) => (
            <div
              key={problem.title}
              className={`group bg-[#101010] gold-border p-6 card-hover transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-9 h-9 shrink-0 flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:bg-[rgba(214,168,79,0.1)]"
                  style={{ border: '1px solid rgba(214,168,79,0.25)' }}
                >
                  <AlertCircle size={15} className="text-gold-DEFAULT" />
                </div>
                <div>
                  <h3
                    className="text-[#F5F1E8] font-semibold mb-2 group-hover:text-gold-DEFAULT transition-colors duration-300"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px' }}
                  >
                    {problem.title}
                  </h3>
                  <p className="text-[#A8A8A8] text-xs leading-relaxed">{problem.description}</p>
                </div>
              </div>
              <div className="mt-5 w-0 h-px bg-gold-DEFAULT group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
