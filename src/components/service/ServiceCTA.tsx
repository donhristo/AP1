import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle, ChevronRight } from 'lucide-react'
import { servicePages } from '../../data/services'
import type { ServicePage } from '../../data/services'

interface FormState {
  name: string
  phone: string
  brand: string
  model: string
  year: string
  service: string
  comment: string
}

const initial: FormState = { name: '', phone: '', brand: '', model: '', year: '', service: '', comment: '' }

interface Props {
  service: ServicePage
}

export default function ServiceCTA({ service }: Props) {
  const [form, setForm] = useState<FormState>({ ...initial, service: service.title })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass =
    'w-full bg-[#0d0d0d] border border-[rgba(214,168,79,0.2)] text-[#F5F1E8] text-sm px-4 py-3.5 placeholder-[#444] focus:outline-none focus:border-gold-DEFAULT transition-colors duration-300 hover:border-[rgba(214,168,79,0.4)]'

  return (
    <section id="service-cta" className="py-20 md:py-28 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(214,168,79,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <span className="section-label flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold-DEFAULT inline-block" />
              Бесплатно
            </span>
            <h2 className="section-title mb-5">
              Рассчитать стоимость<br />
              <em style={{ color: '#D6A84F', fontStyle: 'italic' }}>{service.title.toLowerCase()}</em>
            </h2>
            <p className="text-[#A8A8A8] text-sm leading-relaxed mb-10 max-w-[400px]">
              Оставьте заявку, и мы свяжемся с вами, чтобы подобрать удобное время и рассчитать точную стоимость работ.
            </p>
            <ul className="space-y-4 mb-10">
              {['Бесплатная диагностика', 'Расчёт стоимости за 15 минут', 'Консультация эксперта'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <ChevronRight size={14} className="text-gold-DEFAULT shrink-0" />
                  <span className="text-[#F5F1E8] text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="h-px max-w-[280px]" style={{ background: 'linear-gradient(to right, rgba(214,168,79,0.4), transparent)' }} />
          </div>

          {/* Right: form */}
          <div>
            {submitted ? (
              <div
                className="bg-[#101010] gold-border p-10 text-center"
                style={{ boxShadow: '0 0 40px rgba(214,168,79,0.07)' }}
              >
                <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center border border-gold-DEFAULT">
                  <CheckCircle size={26} className="text-gold-DEFAULT" />
                </div>
                <h3
                  className="text-[#F5F1E8] text-2xl font-semibold mb-3"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Заявка отправлена
                </h3>
                <p className="text-[#A8A8A8] text-sm leading-relaxed">
                  Мы свяжемся с вами в ближайшее время для согласования удобного времени.
                </p>
                <button onClick={() => setSubmitted(false)} className="mt-8 btn-outline text-xs">
                  Отправить ещё одну
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#101010] gold-border p-8"
                style={{ boxShadow: '0 0 40px rgba(0,0,0,0.4)' }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-[#A8A8A8] uppercase mb-2">Ваше имя</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Иван" required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-[#A8A8A8] uppercase mb-2">Телефон</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+7 (___) ___-__-__" required className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-[#A8A8A8] uppercase mb-2">Марка автомобиля</label>
                    <input type="text" name="brand" value={form.brand} onChange={handleChange} placeholder="Mercedes-Benz" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-[#A8A8A8] uppercase mb-2">Модель</label>
                    <input type="text" name="model" value={form.model} onChange={handleChange} placeholder="G-Class" className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-[#A8A8A8] uppercase mb-2">Год выпуска</label>
                    <input type="number" name="year" value={form.year} onChange={handleChange} placeholder="2023" min="1990" max="2026" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-[#A8A8A8] uppercase mb-2">Услуга</label>
                    <select name="service" value={form.service} onChange={handleChange} className={inputClass + ' appearance-none cursor-pointer'} style={{ background: '#0d0d0d' }}>
                      {servicePages.map((s) => (
                        <option key={s.slug} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-[10px] tracking-[0.2em] text-[#A8A8A8] uppercase mb-2">Комментарий</label>
                  <textarea
                    name="comment"
                    value={form.comment}
                    onChange={handleChange}
                    placeholder="Дополнительные пожелания..."
                    rows={3}
                    className={inputClass + ' resize-none'}
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center text-[12px] tracking-[0.2em]">
                  Отправить заявку <ArrowRight size={16} />
                </button>
                <p className="text-[#444] text-[11px] text-center mt-4">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
