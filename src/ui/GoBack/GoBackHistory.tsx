'use client'
import { useRouter } from 'next/navigation'

import GoBack from './GoBack'

import { StyleProps } from '@/types/styleProps'

const GoBackHistory = ({ className, style }: StyleProps) => {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return <GoBack className={className} style={style} onClick={handleClick} />
}

export default GoBackHistory
