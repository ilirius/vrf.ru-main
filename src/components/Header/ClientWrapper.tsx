'use client'
import { useCallback, useEffect, useState } from 'react'
import { motion, TargetAndTransition, Transition } from 'framer-motion'

import { StyleProps } from '@/types/styleProps'

type Props = StyleProps & {
  children?: React.ReactNode
}

const searchHiddenHeight = 0
const searchShownHeight = 152

const ClientWrapper = ({ className, children }: Props) => {
  const [height, setHeight] = useState<TargetAndTransition>({})

  const transition: Transition = {
    type: 'ease-in',
    duration: 0.3
  }

  const calculateHeight = useCallback(() => {
    if (window.innerWidth > 768 && height.height !== 110) {
      setHeight({ height: 110 })
      return
    }
    if (window.innerWidth > 768) return

    const scrolled =
      document.documentElement.scrollTop || document.body.scrollTop
    const shouldRender = scrolled < 32
    const newHeight = shouldRender ? searchShownHeight : searchHiddenHeight
    if (height.height !== newHeight) {
      setHeight({
        height: newHeight,
        paddingTop: shouldRender ? 0 : 76,
        marginTop: shouldRender ? 0 : -4,
        overflow: shouldRender ? 'visible' : 'hidden'
      })
    }
  }, [height])

  useEffect(() => {
    window.addEventListener('scroll', calculateHeight)
    window.addEventListener('resize', calculateHeight)
    return () => {
      window.removeEventListener('scroll', calculateHeight)
      window.removeEventListener('resize', calculateHeight)
    }
  }, [calculateHeight])

  return (
    <motion.header
      className={className}
      animate={height}
      transition={transition}
    >
      {children}
    </motion.header>
  )
}

export default ClientWrapper
