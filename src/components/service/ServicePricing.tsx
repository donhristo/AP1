import { useEffect, useRef, useState } from 'react'
import { Info } from 'lucide-react'
import type { ServicePage } from '../../data/services'
import CarClassFinder from './CarClassFinder'

const priceFactors = [
  'Класс автомобиля',
  'Состояние кузова / салона',
  'Выбранные материалы',
  'Необходимость демонтажа элементов',
  'Сложность геометрии кузова',
]

interface Props {
  service: ServicePage
}

export default function ServicePricing({ service }: Props) {
  const [visible, setVisible] = useState(false)
  const [activePackage, setActivePackage] = useState(0)
  const [highlightedClass, setHighlightedClass] = useState<number | null>(null)
  const [finderOpen, setFinderOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLTableRowElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (highlightedClass !== null && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [highlightedClass])

  const fmt = (n: number) => n.toLocaleString('ru-RU') + ' ₽'
  const { pricing } = service
  const activeRow = pricing.rows[activePackage]
  const currentPrices = activeRow?.prices ?? []

  const handleClassFound = (classIndex: number | null) => {
    setHighlightedClass(classIndex)
    if (classIndex !== null) {
      // small delay so table row renders with highlight before scroll
      setTimeout(() => {
        highlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 120)
    }
  }

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#070707]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-label flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-DEFAULT inline-block" />
            Прозрачно
          </span>
          <h2 className="section-title">Ценообразование</h2>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.15s' }}
        >
          {/* Left: pricing table */}
          <div className="lg:col-span-2">
            {/* Package switcher */}
            <div className="flex flex-wrap gap-2 mb-8">
              {pricing.packageNames.map((name, i) => (
                <button
                  key={name}
                  onClick={() => setActivePackage(i)}
                  className={`px-5 py-2.5 text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 ${
                    activePackage === i
                      ? 'bg-gold-DEFAULT text-[#070707]'
                      : 'bg-transparent text-[#A8A8A8] border border-[rgba(214,168,79,0.25)] hover:border-gold-DEFAULT hover:text-[#F5F1E8]'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block overflow-hidden" style={{ border: '1px solid rgba(214,168,79,0.2)' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: '#101010', borderBottom: '1px solid rgba(214,168,79,0.2)' }}>
                    <th className="px-6 py-4 text-left text-[10px] tracking-[0.2em] text-gold-DEFAULT uppercase">Класс автомобиля</th>
                    <th className="px-6 py-4 text-right text-[10px] tracking-[0.2em] text-gold-DEFAULT uppercase">Стоимость</th>
                  </tr>
                </thead>
                <tbody>
                  {pricing.classes.map((cls, i) => {
                    const isHighlighted = highlightedClass === i
                    return (
                      <tr
                        key={cls}
                        ref={isHighlighted ? highlightRef : null}
                        className="group transition-all duration-300"
                        style={{
                          borderBottom: i < pricing.classes.length - 1 ? '1px solid rgba(214,168,79,0.08)' : 'none',
                          background: isHighlighted ? 'rgba(214,168,79,0.1)' : undefined,
                        }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {isHighlighted && (
                              <span className="w-1.5 h-1.5 rounded-full bg-gold-DEFAULT shrink-0" />
                            )}
                            <span
                              className={`text-sm transition-colors duration-300 ${
                                isHighlighted ? 'text-gold-DEFAULT font-semibold' : 'text-[#A8A8A8] group-hover:text-[#F5F1E8]'
                              }`}
                            >
                              {cls}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span
                            className={`font-semibold transition-colors duration-300 ${
                              isHighlighted ? 'text-gold-light' : 'text-gold-DEFAULT'
                            }`}
                            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isHighlighted ? '22px' : '18px' }}
                          >
                            {activeRow ? fmt(activeRow.prices[i] ?? 0) : '—'}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden grid grid-cols-1 gap-2">
              {pricing.classes.map((cls, i) => {
                const isHighlighted = highlightedClass === i
                return (
                  <div
                    key={cls}
                    className="flex items-center justify-between px-5 py-4 transition-all duration-300"
                    style={{
                      border: isHighlighted ? '1px solid rgba(214,168,79,0.5)' : '1px solid rgba(214,168,79,0.15)',
                      background: isHighlighted ? 'rgba(214,168,79,0.08)' : '#101010',
                    }}
                  >
                    <span className={`text-sm ${isHighlighted ? 'text-gold-DEFAULT font-semibold' : 'text-[#A8A8A8]'}`}>
                      {cls}
                    </span>
                    <span
                      className="text-gold-DEFAULT font-semibold"
                      style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isHighlighted ? '20px' : '17px' }}
                    >
                      {activeRow ? fmt(activeRow.prices[i] ?? 0) : '—'}
                    </span>
                  </div>
                )
              })}
            </div>

            {service.pricing.note && (
              <p className="mt-5 text-[#555] text-xs leading-relaxed flex items-start gap-2">
                <Info size={13} className="text-gold-DEFAULT shrink-0 mt-0.5" />
                {service.pricing.note}
              </p>
            )}
          </div>

          {/* Right: info block + finder */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#101010] p-6" style={{ border: '1px solid rgba(214,168,79,0.2)' }}>
              <h3
                className="text-[#F5F1E8] mb-5"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 600 }}
              >
                Как формируется цена
              </h3>
              <p className="text-[#A8A8A8] text-xs leading-relaxed mb-5">
                Цена зависит от нескольких факторов. Финальная стоимость фиксируется после диагностики и не меняется.
              </p>
              <ul className="space-y-3">
                {priceFactors.map((f, i) => (
                  <li key={f} className="flex items-center gap-3">
                    <span
                      className="text-[10px] font-bold text-gold-DEFAULT w-5 shrink-0"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[#A8A8A8] text-xs">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Toggle button */}
            <button
              onClick={() => setFinderOpen((v) => !v)}
              className={`w-full justify-center text-[11px] tracking-[0.15em] uppercase font-semibold py-3 px-5 transition-all duration-300 flex items-center gap-2 ${
                finderOpen
                  ? 'bg-gold-DEFAULT text-[#070707]'
                  : 'bg-transparent text-[#A8A8A8] border border-[rgba(214,168,79,0.3)] hover:border-gold-DEFAULT hover:text-[#F5F1E8]'
              }`}
            >
              {finderOpen ? 'Скрыть определитель' : 'Определить класс автомобиля'}
            </button>

            {/* Car Class Finder */}
            {finderOpen && (
              <CarClassFinder
                onClassFound={handleClassFound}
                prices={currentPrices}
                activePackageName={pricing.packageNames[activePackage] ?? ''}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
