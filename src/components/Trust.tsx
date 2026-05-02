import { useEffect, useRef, useState } from 'react'
import { Shield, Award, CheckCircle, Zap, Star } from 'lucide-react'
import { trustItems } from '../data'

const iconMap: Record<string, React.ElementType> = {
  shield: Shield,
  award: Award,
  'check-circle': CheckCircle,
  zap: Zap,
  star: Star,
}

export default function Trust() {
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
    <section
      id="trust"
      ref={ref}
      className="py-24 md:py-32"
      style={{ background: '#0a0a0a' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-label flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-DEFAULT inline-block" />
            Наши преимущества
          </span>
          <h2 className="section-title">Почему нам доверяют</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {trustItems.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Shield
            return (
              <div
                key={item.title}
                className={`group bg-[#101010] gold-border p-6 card-hover transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 mb-6 flex items-center justify-center transition-all duration-300 group-hover:bg-[rgba(214,168,79,0.1)]"
                  style={{ border: '1px solid rgba(214,168,79,0.25)', boxShadow: 'inset 0 0 0 0 rgba(214,168,79,0)' }}
                >
                  <Icon size={20} className="text-gold-DEFAULT" />
                </div>

                {/* Divider */}
                <div className="w-8 h-px bg-gold-DEFAULT mb-5 transition-all duration-300 group-hover:w-full" style={{ opacity: 0.4 }} />

                <h3
                  className="text-[#F5F1E8] font-semibold mb-3 group-hover:text-gold-DEFAULT transition-colors duration-300"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px' }}
                >
                  {item.title}
                </h3>
                <p className="text-[#A8A8A8] text-xs leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
