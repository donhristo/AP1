import { useEffect, useRef, useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import type { ServicePage } from '../../data/services'

interface Props {
  service: ServicePage
}

export default function ServiceFAQ({ service }: Props) {
  const [visible, setVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#070707]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-label flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-DEFAULT inline-block" />
            Вопросы и ответы
          </span>
          <h2 className="section-title">FAQ</h2>
        </div>

        <div
          className={`max-w-[860px] transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.15s' }}
        >
          {service.faq.map((item, i) => (
            <div
              key={item.question}
              className="transition-all duration-300"
              style={{ borderBottom: '1px solid rgba(214,168,79,0.12)' }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-6 py-6 text-left group"
              >
                <span
                  className={`text-sm font-medium leading-snug transition-colors duration-300 ${
                    openIndex === i ? 'text-gold-DEFAULT' : 'text-[#F5F1E8] group-hover:text-gold-DEFAULT'
                  }`}
                >
                  {item.question}
                </span>
                <div
                  className={`shrink-0 w-7 h-7 flex items-center justify-center transition-all duration-300 ${
                    openIndex === i
                      ? 'bg-gold-DEFAULT text-[#070707]'
                      : 'border border-[rgba(214,168,79,0.35)] text-gold-DEFAULT'
                  }`}
                >
                  {openIndex === i ? <Minus size={13} /> : <Plus size={13} />}
                </div>
              </button>

              <div
                className="overflow-hidden transition-all duration-400"
                style={{ maxHeight: openIndex === i ? '300px' : '0px' }}
              >
                <p className="text-[#A8A8A8] text-sm leading-relaxed pb-6 max-w-[700px]">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
