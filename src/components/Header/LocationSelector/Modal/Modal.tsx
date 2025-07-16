import { useRef, useState } from 'react'
import { RemoveScroll } from 'react-remove-scroll'

import AutoDetection from '@/components/Header/LocationSelector/Modal/AutoDetection'

import { defaultLocationName } from '@/constants/general'

import useClickOutside from '@/hooks/useClickOutside'

import GoBack from '@/ui/GoBack/GoBack'
import Input from '@/ui/Input/Input'

import styles from './Modal.module.scss'

import CheckIcon from '@public/icons/check.svg'

import { LocationType } from '@/redux/slices/location/types'

type Props = {
  onChoose: (location: LocationType | null) => void
  locations: LocationType[]
  onClose: () => void
  selectedLocation: LocationType | null
}

const Modal = ({ onChoose, locations, onClose, selectedLocation }: Props) => {
  const [searchQuery, setSearchQuery] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)

  useClickOutside(containerRef, onClose)

  const chooseLocation = (location: LocationType | null) => {
    onChoose(location)
    onClose()
  }

  const isSelected = (item: LocationType | null) => {
    return selectedLocation?.id === item?.id
  }

  const getLocations = () => {
    return locations.filter(loc =>
      loc.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const filteredLocations = getLocations()

  return (
    <>
      <div className={styles.modalBackground} />
      <RemoveScroll className={styles.modal}>
        <div className={styles.modal__row}>
          <div
            className={styles.modal__container}
            ref={containerRef}
            tabIndex={0}
          >
            <GoBack onClick={onClose} className={styles.modal__back} />
            <div className={styles.modal__title_row}>
              <h3 className={styles.modal__title}>Выберите регион</h3>
              <AutoDetection className={styles.modal__auto_desktop} />
            </div>
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              placeholder={'Начните вводить название региона'}
              className={styles.modal__input}
            />
            {searchQuery ? (
              <div className={styles.modal__listContainer}>
                <ul className={styles.modal__list}>
                  {defaultLocationName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) && (
                    <li
                      onClick={() => chooseLocation(null)}
                      className={
                        (isSelected(null) && styles.modal__active_item) || ''
                      }
                      role={'button'}
                      tabIndex={0}
                      onKeyDown={e => e.key == 'Enter' && chooseLocation(null)}
                    >
                      <p>{defaultLocationName}</p>
                      {isSelected(null) && (
                        <CheckIcon className={styles.modal__check_icon} />
                      )}
                    </li>
                  )}
                  {filteredLocations.map((location: LocationType) => (
                    <li
                      key={location.id}
                      onClick={() => chooseLocation(location)}
                      className={
                        (isSelected(location) && styles.modal__active_item) ||
                        ''
                      }
                      role={'button'}
                      tabIndex={0}
                      onKeyDown={e =>
                        e.key == 'Enter' && chooseLocation(location)
                      }
                    >
                      <p>{location.name}</p>
                      {isSelected(location) && (
                        <CheckIcon className={styles.modal__check_icon} />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <>
                <p className={styles.modal__selected}>
                  Текущий регион:{' '}
                  <span>{selectedLocation?.name || defaultLocationName}</span>
                </p>
                <AutoDetection className={styles.modal__auto_mobile} />
              </>
            )}
          </div>
        </div>
      </RemoveScroll>
    </>
  )
}

export default Modal
