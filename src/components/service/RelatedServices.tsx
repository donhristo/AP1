import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getRelatedServices } from '../../data/services'
import type { ServicePage } from '../../data/services'

interface Props {
  service: ServicePage
}

export default function RelatedServices({ service }: Props) {
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

  const related = getRelatedServices(service.relatedSlugs)

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#070707]" style={{ borderTop: '1px solid rgba(214,168,79,0.1)' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-label flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-DEFAULT inline-block" />
            Другие услуги
          </span>
          <h2 className="section-title">Также вам может подойти</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {related.map((rel, i) => (
            <Link
              key={rel.slug}
              to={`/services/${rel.slug}`}
              onClick={() => window.scrollTo(0, 0)}
              className={`group relative bg-[#101010] gold-border overflow-hidden card-hover block transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={rel.heroImage}
                  alt={rel.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(7,7,7,0.85) 0%, rgba(7,7,7,0.2) 60%, transparent 100%)' }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(214,168,79,0.05)' }}
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3
                      className="text-[#F5F1E8] font-semibold mb-2 group-hover:text-gold-DEFAULT transition-colors duration-300"
                      style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px' }}
                    >
                      {rel.title}
                    </h3>
                    <p className="text-[#A8A8A8] text-xs leading-relaxed line-clamp-2">{rel.subtitle}</p>
                  </div>
                  <div className="w-8 h-8 shrink-0 flex items-center justify-center border border-[rgba(214,168,79,0.3)] text-gold-DEFAULT opacity-0 group-hover:opacity-100 transition-all duration-300 mt-0.5">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
                <div className="mt-4 w-0 h-px bg-gold-DEFAULT group-hover:w-full transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
