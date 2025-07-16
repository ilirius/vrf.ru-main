'use client'

import Share from './Share'

const ShareCurrentURL = () => {
  const getUrl = () => {
    if (typeof window !== 'undefined') return window.location.href
    else return ''
  }
  return <Share url={getUrl()} />
}

export default ShareCurrentURL
