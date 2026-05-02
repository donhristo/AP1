import { useState, useMemo } from 'react'
import { Search, Car, ChevronDown, CheckCircle, X } from 'lucide-react'
import { carDatabase, classLabels, classExamples } from '../../data/carDatabase'

interface Props {
  onClassFound: (classIndex: number | null) => void
  prices: number[]        // prices for active package, indexed by class
  activePackageName: string
}

const classColors = [
  'text-[#A8A8A8]',        // 0 компактные
  'text-[#A8A8A8]',        // 1 седаны
  'text-gold-light',       // 2 бизнес
  'text-gold-light',       // 3 кроссоверы
  'text-gold-DEFAULT',     // 4 большие SUV
  'text-gold-DEFAULT',     // 5 представительские
]

export default function CarClassFinder({ onClassFound, prices, activePackageName }: Props) {
  const [brandQuery, setBrandQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [brandOpen, setBrandOpen] = useState(false)
  const [modelOpen, setModelOpen] = useState(false)
  const [result, setResult] = useState<{ classIndex: number; modelName: string; brandName: string } | null>(null)

  const filteredBrands = useMemo(() => {
    const q = brandQuery.toLowerCase()
    return carDatabase.filter((b) => b.brand.toLowerCase().includes(q))
  }, [brandQuery])

  const selectedBrandData = useMemo(
    () => carDatabase.find((b) => b.brand === selectedBrand) ?? null,
    [selectedBrand]
  )

  const handleSelectBrand = (brand: string) => {
    setSelectedBrand(brand)
    setBrandQuery(brand)
    setBrandOpen(false)
    setSelectedModel(null)
    setResult(null)
    onClassFound(null)
  }

  const handleSelectModel = (modelName: string) => {
    setSelectedModel(modelName)
    setModelOpen(false)
    const model = selectedBrandData?.models.find((m) => m.name === modelName)
    if (model && selectedBrand) {
      const r = { classIndex: model.classIndex, modelName, brandName: selectedBrand }
      setResult(r)
      onClassFound(model.classIndex)
    }
  }

  const handleReset = () => {
    setBrandQuery('')
    setSelectedBrand(null)
    setSelectedModel(null)
    setResult(null)
    onClassFound(null)
    setBrandOpen(false)
    setModelOpen(false)
  }

  const fmt = (n: number) => n.toLocaleString('ru-RU') + ' ₽'

  return (
    <div className="bg-[#0d0d0d] p-6" style={{ border: '1px solid rgba(214,168,79,0.25)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 flex items-center justify-center border border-[rgba(214,168,79,0.4)] shrink-0">
          <Car size={15} className="text-gold-DEFAULT" />
        </div>
        <div>
          <p className="text-[#F5F1E8] text-sm font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Определить класс автомобиля
          </p>
          <p className="text-[#555] text-xs mt-0.5">Выберите марку и модель</p>
        </div>
        {result && (
          <button
            onClick={handleReset}
            className="ml-auto text-[#555] hover:text-[#A8A8A8] transition-colors"
            title="Сбросить"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Result card */}
      {result ? (
        <div
          className="p-5 mb-4"
          style={{ background: 'rgba(214,168,79,0.06)', border: '1px solid rgba(214,168,79,0.3)' }}
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <p className="text-[#555] text-[10px] tracking-[0.15em] uppercase mb-1">Ваш автомобиль</p>
              <p
                className="text-[#F5F1E8] font-semibold"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px' }}
              >
                {result.brandName} {result.modelName}
              </p>
            </div>
            <CheckCircle size={20} className="text-gold-DEFAULT shrink-0 mt-1" />
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span
              className="px-2.5 py-1 text-[10px] font-bold tracking-[0.15em] uppercase bg-gold-DEFAULT text-[#070707]"
            >
              {classLabels[result.classIndex]}
            </span>
          </div>

          <div style={{ borderTop: '1px solid rgba(214,168,79,0.2)' }} className="pt-4">
            <p className="text-[#555] text-[10px] tracking-[0.12em] uppercase mb-1">
              Стоимость · {activePackageName}
            </p>
            <p
              className="text-gold-DEFAULT font-bold"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px' }}
            >
              {prices[result.classIndex] !== undefined ? fmt(prices[result.classIndex]) : '—'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 mb-4">
          {/* Brand selector */}
          <div className="relative">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] pointer-events-none" />
              <input
                type="text"
                value={brandQuery}
                placeholder="Введите марку..."
                onChange={(e) => {
                  setBrandQuery(e.target.value)
                  setBrandOpen(true)
                  setSelectedBrand(null)
                  setSelectedModel(null)
                  setResult(null)
                  onClassFound(null)
                }}
                onFocus={() => setBrandOpen(true)}
                className="w-full pl-9 pr-4 py-3 bg-[#101010] text-[#F5F1E8] text-sm placeholder-[#555] outline-none focus:border-gold-DEFAULT transition-colors"
                style={{ border: '1px solid rgba(214,168,79,0.2)', fontFamily: 'Manrope, sans-serif' }}
              />
            </div>
            {brandOpen && filteredBrands.length > 0 && (
              <div
                className="absolute z-20 top-full left-0 right-0 max-h-48 overflow-y-auto"
                style={{ background: '#0d0d0d', border: '1px solid rgba(214,168,79,0.25)', borderTop: 'none' }}
              >
                {filteredBrands.map((b) => (
                  <button
                    key={b.brand}
                    onMouseDown={() => handleSelectBrand(b.brand)}
                    className="w-full text-left px-4 py-2.5 text-sm text-[#A8A8A8] hover:text-gold-DEFAULT hover:bg-[rgba(214,168,79,0.05)] transition-colors"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {b.brand}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Model selector */}
          {selectedBrand && selectedBrandData && (
            <div className="relative">
              <button
                onClick={() => setModelOpen((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3 bg-[#101010] text-sm text-left transition-colors"
                style={{ border: '1px solid rgba(214,168,79,0.2)', fontFamily: 'Manrope, sans-serif' }}
              >
                <span className={selectedModel ? 'text-[#F5F1E8]' : 'text-[#555]'}>
                  {selectedModel ?? 'Выберите модель...'}
                </span>
                <ChevronDown
                  size={13}
                  className={`text-[#555] transition-transform ${modelOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {modelOpen && (
                <div
                  className="absolute z-20 top-full left-0 right-0 max-h-48 overflow-y-auto"
                  style={{ background: '#0d0d0d', border: '1px solid rgba(214,168,79,0.25)', borderTop: 'none' }}
                >
                  {selectedBrandData.models.map((m) => (
                    <button
                      key={m.name}
                      onClick={() => handleSelectModel(m.name)}
                      className="w-full text-left px-4 py-2.5 text-sm text-[#A8A8A8] hover:text-gold-DEFAULT hover:bg-[rgba(214,168,79,0.05)] transition-colors flex items-center justify-between"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <span>{m.name}</span>
                      <span className={`text-[10px] tracking-wider ${classColors[m.classIndex]}`}>
                        {classLabels[m.classIndex].split(' — ')[1]}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Class legend */}
      {!result && (
        <div className="space-y-1.5">
          {classLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gold-DEFAULT w-4 shrink-0 text-center"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {i + 1}
              </span>
              <span className="text-[#555] text-[11px]">{label.split(' — ')[1]}</span>
              <span className="text-[#333] text-[10px] ml-auto">{classExamples[i]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
