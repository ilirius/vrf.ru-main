'use client'

import { Suspense } from 'react'
import Link from 'next/link'

import { HOME } from '@/constants/links'

const NotFoundPage = ({ forceReload }: { forceReload?: boolean }) => {
  const click = () => {
    if (forceReload) {
      window.location.reload()
    }
  }

  return (
    <Suspense fallback={null}>
      <div className={'notFound'}>
        <h2>Ждем новостей</h2>
        <p>В этой рубрике пока ничего нет</p>
        <Link href={HOME} onClick={click}>
          На главную
        </Link>
      </div>
    </Suspense>
  )
}

export default NotFoundPage
