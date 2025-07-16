'use client'
import { useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

import { TAG } from '@/constants/links'

import styles from './Tags.module.scss'

import { Tag } from '@/redux/slices/article/types'

type Props = {
  tags: Tag[]
}

const Tags = ({ tags }: Props) => {
  const [opened, setOpened] = useState(!(tags?.length > 5))

  return (
    <div className={styles.tags}>
      <div
        className={classNames(
          styles.tags__container,
          !opened && styles.tags__container_closed
        )}
      >
        {tags?.map((feat, index) => (
          <Link
            href={TAG + feat.feat}
            key={index}
            style={{ textDecoration: 'none' }}
          >
            <span className={styles.tags__item}>{feat.feat}</span>
          </Link>
        ))}
      </div>
      {!opened && (
        <button className={styles.tags__open} onClick={() => setOpened(true)}>
          Все теги
        </button>
      )}
    </div>
  )
}

export default Tags
