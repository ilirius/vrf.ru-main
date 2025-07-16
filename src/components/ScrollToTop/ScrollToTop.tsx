'use client'
import { useEffect, useState } from 'react'
import classNames from 'classnames'

import ScrollToTopIcon from '@/components/ScrollToTop/ScrollToTopIcon/ScrollToTopIcon'

import styles from './ScrollToTop.module.scss'

const appearHeight = typeof window === 'undefined' ? 1000 : window?.innerHeight

const ScrollToTop = () => {
  const [shown, setShown] = useState(false)

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrolled =
        document.documentElement.scrollTop || document.body.scrollTop

      if (scrolled < appearHeight && shown) {
        setShown(false)
      }
      if (scrolled >= appearHeight && !shown) {
        setShown(true)
      }
    }
    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [shown])

  return (
    <div
      className={classNames(
        styles.scrollToTop,
        !shown && styles.scrollToTopHidden
      )}
    >
      <div
        className={styles.scrollToTop__container}
        onClick={scrollToTop}
        tabIndex={0}
        role={'button'}
        onKeyDown={e => e.key == 'Enter' && scrollToTop()}
      >
        <ScrollToTopIcon />
      </div>
    </div>
  )
}

export default ScrollToTop
