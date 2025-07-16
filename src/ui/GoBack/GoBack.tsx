import Icon from '@/ui/Icon/Icon'

import styles from './GoBack.module.scss'

import BackIcon from '@public/icons/back/back.svg'
import BackIconHover from '@public/icons/back/back-hover.svg'

import { StyleProps } from '@/types/styleProps'

type Props = StyleProps & {
  onClick?: () => void
}

const GoBack = ({ className, style, onClick }: Props) => {
  return (
    <div className={`${className} ${styles.goBack}`} style={style}>
      <button className={styles.goBack__button} onClick={onClick}>
        <Icon
          ActiveIcon={BackIconHover}
          DefaultIcon={BackIcon}
          HoverIcon={BackIconHover}
          title={'Вернуться назад'}
          width={80}
          height={24}
        />
      </button>
    </div>
  )
}

export default GoBack
