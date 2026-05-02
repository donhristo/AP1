import { useEffect } from 'react'
import type { ServicePage } from '../../data/services'
import Header from '../Header'
import Footer from '../Footer'
import ServiceHero from './ServiceHero'
import ServiceOverview from './ServiceOverview'
import ServicePackages from './ServicePackages'
import ServicePricing from './ServicePricing'
import ServiceIncluded from './ServiceIncluded'
import ServiceProcess from './ServiceProcess'
import ServiceGallery from './ServiceGallery'
import ServiceFAQ from './ServiceFAQ'
import ServiceCTA from './ServiceCTA'
import RelatedServices from './RelatedServices'

interface Props {
  service: ServicePage
}

export default function ServicePageTemplate({ service }: Props) {
  useEffect(() => {
    document.title = service.seoTitle
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', service.seoDescription)
    window.scrollTo(0, 0)
  }, [service])

  return (
    <div className="min-h-screen" style={{ background: '#050505' }}>
      <Header />
      <main>
        <ServiceHero service={service} />
        <ServiceOverview service={service} />
        <ServicePackages service={service} />
        <ServicePricing service={service} />
        <ServiceIncluded service={service} />
        <ServiceProcess service={service} />
        <ServiceGallery service={service} />
        <ServiceFAQ service={service} />
        <ServiceCTA service={service} />
        <RelatedServices service={service} />
      </main>
      <Footer />
    </div>
  )
}
