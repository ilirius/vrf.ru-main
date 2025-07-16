'use client'

import { useSelector } from 'react-redux'

import { StateType } from '@/redux/slices'
import { StyleProps } from '@/types/styleProps'

type Props = StyleProps & {
  children: React.ReactNode
}

export const searchBarHidden = () => {
  return (
    typeof window !== 'undefined' &&
    window.innerWidth <= 1024 &&
    window.innerWidth > 768
  )
}

const Controls = ({ children, className }: Props) => {
  const { searchBarOpened } = useSelector(
    (state: StateType) => state.session.articles
  )

  if (searchBarHidden() && searchBarOpened) return
  return <div className={className}>{children}</div>
}

export default Controls
