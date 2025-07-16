import { ReactNode, Suspense } from 'react'
import type { Metadata, Viewport } from 'next'

import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop'
import ToastContainerComponent from '@/components/ToastContainerComponent/ToastContainerComponent'

import '@/styles/reset.css'
import './globals.scss'

import { IBM_Plex_Sans_Font } from './fonts'

import ProviderClient from '@/redux/store/ProviderClient'

export const metadata: Metadata = {
  title: 'В РФ'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d1665'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang={'ru'} className=''>
      <body className={IBM_Plex_Sans_Font.className}>
        <ProviderClient>
          <Header />
          <Suspense>
            <main>{children}</main>
          </Suspense>
          <ToastContainerComponent />
          <ScrollToTop />
          <Footer />
        </ProviderClient>
      </body>
    </html>
  )
}
