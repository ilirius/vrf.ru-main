'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

import { defaultLocationName } from '@/constants/general'
import { LOCATION } from '@/constants/links'

import styles from './LocationSelector.module.scss'

import Modal from './Modal/Modal'

import LocationIcon from '@public/icons/location/location.svg'
import LocationIconMobile from '@public/icons/location/location-mobile.svg'

import { StateType } from '@/redux/slices'
import {
  getLocationAutoAction,
  getLocationsAction,
  setIsMenuOpenAction,
  setLocationAction
} from '@/redux/slices/location/slice'
import { LocationType } from '@/redux/slices/location/types'

type Props = {
  skipFetching?: boolean
}

const LocationSelector = ({ skipFetching }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const ref = useRef<HTMLDivElement>(null)

  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()

  const { selectedLocation, allLocations, autoDetect } = useSelector(
    (state: StateType) => state.local.location
  )

  const setMenuState = (isOpen: boolean) => {
    setIsMenuOpen(isOpen)
    dispatch(setIsMenuOpenAction(isOpen))
  }
  const closeMenu = () => {
    document.body.style.overflow = 'unset'
    setMenuState(false)
  }
  const openMenu = () => {
    setMenuState(true)
    document.body.style.overflow = 'hidden'
  }

  const switchMenu = () => (isMenuOpen ? closeMenu() : openMenu())

  useEffect(() => {
    if (!skipFetching) {
      dispatch(getLocationsAction())
      if (autoDetect === undefined) dispatch(getLocationAutoAction())
    }
  }, [])

  useEffect(
    () => () => {
      dispatch(setIsMenuOpenAction(false))
    },
    []
  )

  const handleClick = (item: LocationType | null) => {
    dispatch(setLocationAction(item))
    if (pathname.split('/')[1] === LOCATION.replaceAll('/', '')) {
      router.replace(LOCATION + item?.id)
    }
    closeMenu()
  }

  return (
    <div className={styles.selector} ref={ref}>
      <button
        onClick={switchMenu}
        className={`${styles.selector__current} ${isMenuOpen && styles.selector__current_active}`}
      >
        <LocationIcon className={styles.selector__location_icon} />
        <LocationIconMobile className={styles.selector__location_icon_mobile} />
        <span
          className={styles.selector__current_location}
          suppressHydrationWarning
        >
          {isHydrated ? selectedLocation?.name || defaultLocationName : ''}
        </span>
      </button>
      {isMenuOpen && (
        <Modal
          onClose={closeMenu}
          locations={allLocations}
          onChoose={handleClick}
          selectedLocation={selectedLocation}
        />
      )}
    </div>
  )
}

export default LocationSelector
