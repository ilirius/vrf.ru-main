'use client'
import React, { ForwardedRef, useEffect } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import parse from 'html-react-parser'
import { useDispatch, useSelector } from 'react-redux'

import { ARTICLE } from '@/constants/links'

import { formatDate } from '@/utils/formatDate'

import ImageRenderer from '@/ui/ImageRenderer/ImageRenderer'

import styles from './Results.module.scss'

import { GetArticlesParams } from '@/redux/api/fetchArticles'
import { StateType } from '@/redux/slices'
import { getArticlesAction } from '@/redux/slices/article/slice'

type Props = {
  query: string
  search: () => void
  onFocus?: () => void
  onBlur?: () => void
  onClick?: () => void
  onClose?: () => void
  disabled?: boolean
}

const mobileArticlesCount = 4

const Results = (
  { query, search, onFocus, onBlur, disabled, onClick, onClose }: Props,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const dispatch = useDispatch()

  const { searchBarData } = useSelector(
    (state: StateType) => state.session.articles
  )

  useEffect(() => {
    if (disabled) return

    const params: GetArticlesParams = {
      count: 12,
      search: query,
      isSearchBar: true
    }
    dispatch(getArticlesAction(params))
  }, [query, disabled])

  return (
    <div
      className={styles.results}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={0}
      onClick={onClick}
      ref={ref}
      style={searchBarData?.length && !disabled ? {} : { display: 'none' }}
    >
      <div className={styles.results__container}>
        <ul className={styles.results__list}>
          {searchBarData?.map((article, index) => (
            <li
              key={article.id}
              className={classNames(
                index >= mobileArticlesCount && styles.results__mobile_hidden
              )}
            >
              <div className={styles.results__description}>
                <Link
                  href={ARTICLE + article.id}
                  className={styles.results__link}
                  onClick={onClose}
                >
                  <h3 className={styles.results__title}>
                    {parse(article.title)}
                  </h3>
                </Link>
                <span
                  className={classNames(
                    styles.results__date,
                    index == mobileArticlesCount - 1 &&
                      styles.results__last_date
                  )}
                >
                  {formatDate(article.date || article.create_date2)}
                </span>
              </div>
              <Link
                href={ARTICLE + article.id}
                className={styles.results__link}
                onClick={onClose}
              >
                <div className={styles.results__image_container}>
                  <ImageRenderer
                    article={article}
                    sizes={'(max-width: 430px) 137px, 105px'}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <button className={styles.results__button} onClick={search}>
          Показать все результаты
        </button>
      </div>
    </div>
  )
}

export default React.forwardRef(Results)
