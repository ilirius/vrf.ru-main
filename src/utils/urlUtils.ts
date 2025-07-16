import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants'

export const formatDomain = (domain: string) => {
  return domain?.replace(/^https?:\/\//, '')
}

export const getEndpointUrl = (endpoint: string) => {
  let url = endpoint
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    url = process.env.API_URL + url.replace('/api', '')
  } else if (typeof window === 'undefined') {
    url = process.env.URL + url
  }
  return url
}
