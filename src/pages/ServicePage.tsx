import { useParams, Navigate } from 'react-router-dom'
import { getServiceBySlug } from '../data/services'
import ServicePageTemplate from '../components/service/ServicePageTemplate'

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const service = slug ? getServiceBySlug(slug) : undefined

  if (!service) return <Navigate to="/" replace />

  return <ServicePageTemplate service={service} />
}
