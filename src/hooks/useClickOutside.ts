'use client'
import { RefObject } from 'react'

import useEventListener from '@/hooks/useEventListener'

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  onClick: () => void
) => {
  useEventListener(
    'mousedown',
    (event: MouseEvent) => {
      if (
        event.target &&
        ref?.current &&
        !ref.current.contains(<Node>event.target)
      )
        onClick()
    },
    [ref]
  )
}

export default useClickOutside
