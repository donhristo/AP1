import { useEffect, useRef, useState } from 'react'
import { processSteps } from '../data'

export default function Process() {
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
      id="process"
      ref={ref}
      className="py-24 md:py-32"
      style={{ background: '#0a0a0a' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-label flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-DEFAULT inline-block" />
            Как мы работаем
          </span>
          <h2 className="section-title">Процесс работы</h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Desktop connector line */}
          <div
            className="hidden lg:block absolute top-[52px] left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(to right, transparent 0%, rgba(214,168,79,0.2) 10%, rgba(214,168,79,0.2) 90%, transparent 100%)' }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                className={`group relative transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${0.15 + i * 0.15}s` }}
              >
                {/* Number circle */}
                <div className="relative mb-8">
                  <div
                    className="w-[104px] h-[104px] flex items-center justify-center relative bg-[#101010] group-hover:bg-[#141414] transition-all duration-300"
                    style={{ border: '1px solid rgba(214,168,79,0.25)' }}
                  >
                    <span
                      className="text-gold-DEFAULT transition-all duration-300"
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '40px',
                        fontWeight: 600,
                        lineHeight: 1,
                      }}
                    >
                      {step.number}
                    </span>
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: 'inset 0 0 30px rgba(214,168,79,0.08)' }} />
                  </div>

                  {/* Arrow between steps (desktop) */}
                  {i < processSteps.length - 1 && (
                    <div
                      className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 items-center justify-center w-6 h-6"
                      style={{ color: 'rgba(214,168,79,0.4)' }}
                    >
                      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                        <path d="M0 5H14M10 1L14 5L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Text */}
                <h3
                  className="text-xl font-semibold text-[#F5F1E8] mb-3 group-hover:text-gold-DEFAULT transition-colors duration-300"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px' }}
                >
                  {step.title}
                </h3>
                <p className="text-[#A8A8A8] text-sm leading-relaxed">{step.description}</p>

                {/* Mobile vertical line */}
                {i < processSteps.length - 1 && (
                  <div
                    className="lg:hidden absolute left-[51px] bottom-[-32px] w-px h-8"
                    style={{ background: 'rgba(214,168,79,0.2)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
