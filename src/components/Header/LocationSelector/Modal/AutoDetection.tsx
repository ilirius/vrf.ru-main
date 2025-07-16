import { useDispatch, useSelector } from 'react-redux'

import Switch from '@/ui/Switch/Switch'

import { StateType } from '@/redux/slices'
import {
  disableAutoDetect,
  getLocationAutoAction
} from '@/redux/slices/location/slice'
import { StyleProps } from '@/types/styleProps'

const AutoDetection = ({ className, style }: StyleProps) => {
  const { autoDetect } = useSelector((state: StateType) => state.local.location)

  const dispatch = useDispatch()

  const toggle = () => {
    if (autoDetect) {
      dispatch(disableAutoDetect())
    } else {
      dispatch(getLocationAutoAction())
    }
  }

  return (
    <div className={className} style={style}>
      <span style={{ color: 'var(--blue50)', fontSize: 15 }}>
        Автоопределение
      </span>
      <Switch onSwitch={toggle} value={autoDetect || false} />
    </div>
  )
}

export default AutoDetection
