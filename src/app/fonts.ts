import { IBM_Plex_Sans } from 'next/font/google'

export const IBM_Plex_Sans_Font = IBM_Plex_Sans({
  weight: ['400', '600', '700'],
  style: ['normal'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: false
})
