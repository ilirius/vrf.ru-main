'use client'
import { useEffect, useState } from 'react'

import Icon from '@/ui/Icon/Icon'

import styles from './ScrollToTopIcon.module.scss'

import Active from '@public/icons/scroll-to-top/active.svg'
import Default from '@public/icons/scroll-to-top/default.svg'
import Hover from '@public/icons/scroll-to-top/hover.svg'

const ScrollToTopIcon = () => {
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  const isTouchDevice = () =>
    'ontouchstart' in window || navigator.maxTouchPoints > 0

  useEffect(() => {
    if (!active) setHovered(false)
  }, [active])

  return (
    <div
      tabIndex={0}
      aria-label={'Наверх'}
      className={styles.scrollToTopIcon}
      onMouseEnter={() => setHovered(!isTouchDevice())}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onKeyDown={e => e.key === 'Enter' && setActive(true)}
      onKeyUp={e => e.key === 'Enter' && setActive(false)}
    >
      <Icon
        DefaultIcon={Default}
        HoverIcon={Hover}
        ActiveIcon={Active}
        width={24}
        height={24}
        title={'Наверх'}
        hoveredExternal={hovered}
        isActive={active}
      />
    </div>
  )
}

export default ScrollToTopIcon
