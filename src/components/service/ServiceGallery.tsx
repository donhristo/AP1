import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { ServicePage } from '../../data/services'

interface Props {
  service: ServicePage
}

export default function ServiceGallery({ service }: Props) {
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

  const images = service.galleryImages

  return (
    <section ref={ref} className="py-20 md:py-28" style={{ background: '#0a0a0a' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-label flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold-DEFAULT inline-block" />
            Результаты
          </span>
          <h2 className="section-title">Визуальный результат</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <div
              key={src}
              className={`group relative overflow-hidden gold-border cursor-pointer transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={src}
                  alt={`${service.title} — результат ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(7,7,7,0.7) 0%, transparent 60%)' }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: 'rgba(7,7,7,0.5)' }}
                />
                <div className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center border border-[rgba(214,168,79,0.4)] text-gold-DEFAULT opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight size={16} />
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-DEFAULT group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
