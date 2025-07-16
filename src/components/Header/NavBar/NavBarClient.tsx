'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import { defaultTopicName } from '@/constants/general'
import { HOME, LOCATION, TOPIC } from '@/constants/links'

import useClickOutside from '@/hooks/useClickOutside'

import { blankButton } from '@/utils/styles'

import Icon from '@/ui/Icon/Icon'

import styles from './NavBar.module.scss'

import CheckIcon from '@public/icons/check.svg'
import ThreeDots from '@public/icons/three-dots/default.svg'
import ThreeDotsHover from '@public/icons/three-dots/hover.svg'

import { StateType } from '@/redux/slices'
import { LocationType } from '@/redux/slices/location/types'
import { setTopicAction, setTopicsAction } from '@/redux/slices/topic/slice'
import { TopicType } from '@/redux/slices/topic/types'
import { store } from '@/redux/store/store'

type Props = {
  topics?: TopicType[]
}

const NavBarClient = ({ topics }: Props) => {
  const [mount, setMount] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)

  const dropDownRef = useRef<HTMLDivElement>(null)
  useClickOutside(dropDownRef, () => setOpenDropdown(false))

  const pathname = usePathname()
  const dispatch = useDispatch()

  const [selectedLocation, setSelectedLocation] =
    useState<LocationType | null>()
  const { selectedTopic, allTopics } = useSelector(
    (state: StateType) => state.local.topics
  )
  const { selectedLocation: currentLocation } = useSelector(
    (state: StateType) => state.local.location
  )

  useEffect(() => {
    setSelectedLocation(currentLocation)
  }, [currentLocation])

  const renderingTopics = [...(topics || allTopics)]
    .sort((a, b) =>
      selectedTopic
        ? Number(b.id === selectedTopic.id) - Number(a.id === selectedTopic.id)
        : 0
    )
    .filter(t => t.id !== 4 && t.id !== 3 && t.id !== 9 && t.id !== 2)

  useEffect(() => {
    setMount(true)
    setSelectedLocation(store.getState().local?.location.selectedLocation)
    dispatch(setTopicsAction(topics || allTopics))

    const initialTopic =
      (topics || allTopics).find(
        topic => topic.id == Number(pathname.split('/').at(-1))
      ) || null
    dispatch(setTopicAction(initialTopic))
  }, [])

  const isSelected = (topic: TopicType | null) => {
    if (!mount || isSelectedLocation()) return false
    return selectedTopic?.id === topic?.id
  }

  const isSelectedLocation = () => {
    return (
      pathname.split('/')[1] === LOCATION.replaceAll('/', '') &&
      Number(pathname.split('/').at(-1)) === selectedLocation?.id
    )
  }

  return (
    <div className={styles.navBar}>
      <nav className={styles.navBar__nav}>
        <Link
          className={classNames(
            styles.navBar__topic,
            isSelected(null) && styles.navBar__topic_active,
            `topic_index_${0}`
          )}
          href={HOME}
        >
          {defaultTopicName}
        </Link>
        {mount && selectedLocation && (
          <Link
            className={classNames(
              styles.navBar__topic,
              isSelectedLocation() && styles.navBar__topic_active,
              `topic_index_${1}`
            )}
            href={LOCATION + selectedLocation.id}
          >
            {selectedLocation.name}
          </Link>
        )}
        {renderingTopics.map((topic: TopicType, index) => (
          <Link
            className={classNames(
              styles.navBar__topic,
              isSelected(topic) && styles.navBar__topic_active,
              `topic_index_${index + 1 + Number(selectedLocation !== null)}`
            )}
            key={topic.id}
            href={TOPIC + topic.url_name}
          >
            {topic.name}
          </Link>
        ))}
      </nav>
      <button
        style={blankButton}
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <Icon
          DefaultIcon={ThreeDots}
          HoverIcon={ThreeDotsHover}
          ActiveIcon={ThreeDotsHover}
          width={32}
          height={32}
          title={'Еще'}
          isActive={openDropdown}
        />
      </button>
      {openDropdown && (
        <div ref={dropDownRef} className={styles.navBar__dropdown}>
          <div className={styles.navBar__dropdown_container}>
            <ul>
              <li>
                <Link
                  className={classNames(
                    styles.navBar__dropdown_topic,
                    isSelected(null) && styles.navBar__dropdown_topic_active,
                    `dropdown_topic_index_${0}`
                  )}
                  onClick={() => setOpenDropdown(false)}
                  href={HOME}
                >
                  {defaultTopicName}
                </Link>
              </li>
              {renderingTopics.map((topic: TopicType, index) => (
                <li key={topic.id}>
                  <Link
                    className={classNames(
                      styles.navBar__dropdown_topic,
                      isSelected(topic) && styles.navBar__dropdown_topic_active,
                      `dropdown_topic_index_${index + 1 + Number(selectedLocation !== null)}`
                    )}
                    onClick={() => setOpenDropdown(false)}
                    href={TOPIC + topic.url_name}
                  >
                    {topic.name}
                    {isSelected(topic) && <CheckIcon />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBarClient
