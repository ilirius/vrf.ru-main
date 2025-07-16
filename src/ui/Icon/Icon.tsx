'use client'

import { CSSProperties, useEffect, useState } from 'react'

import { StyleProps } from '@/types/styleProps'
import { SVGComponent } from '@/types/svgComponent'

type Props = StyleProps & {
  DefaultIcon: SVGComponent
  HoverIcon: SVGComponent
  ActiveIcon: SVGComponent
  isActive?: boolean
  onClick?: () => void
  width: number
  height: number
  tabIndex?: number
  title: string
  transition?: boolean
  defaultIconOpacity?: number
  hoveredExternal?: boolean
}

const Icon = ({
  ActiveIcon,
  DefaultIcon,
  HoverIcon,
  onClick,
  title,
  isActive,
  className,
  style,
  width,
  height,
  tabIndex,
  transition = true,
  defaultIconOpacity,
  hoveredExternal
}: Props) => {
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!isActive) setHovered(false)
  }, [isActive])

  const isTouchDevice = () =>
    'ontouchstart' in window || navigator.maxTouchPoints > 0

  const displayNone = (
    value: boolean,
    isDefaultIcon = false
  ): CSSProperties => {
    const transparent: CSSProperties = {
      opacity: 0,
      pointerEvents: 'none',
      transition: transition ? '0.3s opacity ease-in' : '',
      position: 'absolute'
    }
    const defaultStyle: CSSProperties = {
      transition: transition ? '0.3s opacity ease-out' : '',
      opacity: isDefaultIcon ? defaultIconOpacity : 1,
      position: 'absolute'
    }
    return value ? transparent : defaultStyle
  }

  const disable = () => {
    setHovered(true)
    onClick && onClick()
  }

  const onKeyDown = (evt: React.KeyboardEvent<SVGElement>) => {
    if (evt.key == 'Enter') {
      onClick && onClick()
    }
  }

  const getHovered = () =>
    hoveredExternal === undefined ? hovered : hoveredExternal

  return (
    <div
      className={className}
      style={{
        ...style,
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex'
      }}
      title={title}
    >
      <DefaultIcon
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        aria-label={title}
        role={'button'}
        style={displayNone(getHovered() || isActive || false, true)}
        onMouseEnter={() => setHovered(!isTouchDevice())}
      />
      <HoverIcon
        onClick={onClick}
        style={displayNone(!getHovered() || isActive || false)}
        role={'button'}
        aria-label={title}
        onMouseLeave={() => setHovered(false)}
      />
      <ActiveIcon
        onClick={disable}
        style={displayNone(!isActive)}
        role={'button'}
        aria-label={title}
      />
    </div>
  )
}

export default Icon
