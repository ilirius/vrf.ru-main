'use client'
import Link from 'next/link'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { RemoveScroll } from 'react-remove-scroll'

import { defaultTopicName } from '@/constants/general'
import { HOME, TOPIC } from '@/constants/links'

import GoBack from '@/ui/GoBack/GoBack'

import styles from './TopicsModal.module.scss'

import CheckIcon from '@public/icons/check.svg'

import { StateType } from '@/redux/slices'

type Props = {
  onClose: () => void
}

const TopicsModal = ({ onClose }: Props) => {
  const { allTopics, selectedTopic } = useSelector(
    (state: StateType) => state.local.topics
  )

  const renderingTopics = allTopics.filter(
    t => t.id !== 4 && t.id !== 3 && t.id !== 9 && t.id !== 2
  )

  return (
    <RemoveScroll className={styles.topicsModal}>
      <GoBack onClick={onClose} className={styles.topicsModal__back} />
      <h2 className={styles.topicsModal__h2}>Выберите раздел</h2>
      <div className={styles.topicsModal__list}>
        <ul>
          <li
            className={classNames(
              styles.topicsModal__item,
              selectedTopic === null && styles.topicsModal__item_active
            )}
          >
            {selectedTopic === null ? (
              <>
                {defaultTopicName}
                <CheckIcon />
              </>
            ) : (
              <Link
                href={HOME}
                onClick={onClose}
                className={styles.topicsModal__link}
              >
                {defaultTopicName}
              </Link>
            )}
          </li>
          {renderingTopics?.map(topic => (
            <li
              key={topic.id}
              className={classNames(
                styles.topicsModal__item,
                selectedTopic?.id === topic.id &&
                  styles.topicsModal__item_active
              )}
            >
              {selectedTopic?.id === topic.id ? (
                <>
                  {topic.name}
                  <CheckIcon />
                </>
              ) : (
                <Link
                  href={TOPIC + topic.url_name}
                  onClick={onClose}
                  className={styles.topicsModal__link}
                >
                  {topic.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </RemoveScroll>
  )
}

export default TopicsModal
