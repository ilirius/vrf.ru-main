import { AriaRole } from 'react'
import classNames from 'classnames'

import styles from './CloseIcon.module.scss'

import { StyleProps } from '@/types/styleProps'

type Props = StyleProps & {
  tabIndex?: number
  onClick: () => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  ['aria-label']?: string
  role: AriaRole
}

const CloseIcon = (props: Props) => {
  return (
    <div
      className={classNames(props.className, styles.closeIcon)}
      tabIndex={props.tabIndex}
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
      aria-label={props['aria-label']}
      role={props.role}
    >
      <span className={styles.closeIcon__left_line} />
      <span className={styles.closeIcon__right_line} />
    </div>
  )
}

export default CloseIcon
