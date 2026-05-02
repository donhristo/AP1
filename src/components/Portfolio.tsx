import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { portfolioItems, portfolioCategories } from '../data'

const INITIAL_COUNT = 5

export default function Portfolio() {
  const [visible, setVisible]             = useState(false)
  const [activeCategory, setActiveCategory] = useState('Все')
  const [showAll, setShowAll]             = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const filtered =
    activeCategory === 'Все'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory)

  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_COUNT)
  const hasMore   = filtered.length > INITIAL_COUNT

  const handleToggleAll = () => {
    if (showAll) {
      setShowAll(false)
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      setShowAll(true)
    }
  }

  // Reset showAll when category changes
  const handleCategory = (cat: string) => {
    setActiveCategory(cat)
    setShowAll(false)
  }

  return (
    <section id="portfolio" ref={ref} className="py-24 md:py-32 bg-[#070707]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <span className="section-label flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold-DEFAULT inline-block" />
              Результаты
            </span>
            <h2 className="section-title">Наши работы</h2>
          </div>
          {hasMore && (
            <button
              onClick={handleToggleAll}
              className="flex items-center gap-2 text-sm text-gold-DEFAULT hover:text-gold-light transition-colors duration-300 tracking-widest uppercase font-medium whitespace-nowrap self-end sm:self-auto pb-1"
            >
              {showAll ? 'Показать меньше' : `Смотреть все работы (${filtered.length})`}
              <ArrowUpRight size={15} className={`transition-transform duration-300 ${showAll ? 'rotate-90' : ''}`} />
            </button>
          )}
        </div>

        {/* Filters */}
        <div
          className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '0.15s' }}
        >
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-5 py-2 text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gold-DEFAULT text-[#070707]'
                  : 'bg-transparent text-[#A8A8A8] border border-[rgba(214,168,79,0.25)] hover:border-gold-DEFAULT hover:text-[#F5F1E8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((item, i) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden cursor-pointer gold-border transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${i === 0 ? 'lg:col-span-2 lg:row-span-1' : ''}`}
              style={{ transitionDelay: `${0.2 + i * 0.06}s` }}
            >
              <div className={`relative overflow-hidden ${i === 0 ? 'h-72 lg:h-80' : 'h-64'}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Base overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(7,7,7,0.85) 0%, rgba(7,7,7,0.2) 50%, transparent 100%)' }}
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: 'linear-gradient(to top, rgba(7,7,7,0.95) 0%, rgba(7,7,7,0.5) 60%, rgba(214,168,79,0.05) 100%)' }}
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-gold-DEFAULT text-xs tracking-[0.2em] uppercase font-medium mb-1">{item.service}</p>
                  <div className="flex items-end justify-between">
                    <h3
                      className="text-[#F5F1E8] font-semibold"
                      style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px' }}
                    >
                      {item.title}
                    </h3>
                    <div className="w-9 h-9 flex items-center justify-center border border-[rgba(214,168,79,0.4)] text-gold-DEFAULT opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>

                {/* Bottom gold line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-DEFAULT group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Show more button — below grid */}
        {hasMore && (
          <div
            className={`mt-10 flex justify-center transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
          >
            <button
              onClick={handleToggleAll}
              className="flex items-center gap-2 px-8 py-3 text-[11px] font-semibold tracking-[0.2em] uppercase border border-[rgba(214,168,79,0.3)] text-[#A8A8A8] hover:border-gold-DEFAULT hover:text-[#F5F1E8] transition-all duration-300"
            >
              {showAll ? 'Скрыть' : `Показать все ${filtered.length} работы`}
              <ChevronDown
                size={13}
                className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
