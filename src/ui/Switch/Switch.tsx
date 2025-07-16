'use client'
import classNames from 'classnames'

import styles from './Switch.module.scss'

import { StyleProps } from '@/types/styleProps'

type Props = StyleProps & {
  onSwitch: (value: boolean) => void
  value: boolean
}

const Switch = ({ style, className, value, onSwitch }: Props) => {
  return (
    <button
      className={classNames(
        className,
        styles.switch,
        !value && styles.disabled
      )}
      style={style}
      onClick={() => onSwitch(!value)}
    >
      <span
        className={classNames(styles.circle, !value && styles.circleDisabled)}
      ></span>
    </button>
  )
}

export default Switch
