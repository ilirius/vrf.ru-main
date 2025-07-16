'use client'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import styles from './SearchOrderControls.module.scss'

import { StateType } from '@/redux/slices'
import { setArticleSearchOrderAction } from '@/redux/slices/article/slice'
import { ArticleSearchOrder } from '@/redux/slices/article/types'

const SearchOrderControls = () => {
  const dispatch = useDispatch()
  const { searchOrder } = useSelector(
    (state: StateType) => state.session.articles
  )

  const setOrder = (order: ArticleSearchOrder) => {
    if (order !== searchOrder) {
      dispatch(setArticleSearchOrderAction(order))
    }
  }

  return (
    <div className={styles.controls}>
      <button
        className={classNames(
          styles.controls__button,
          searchOrder === 'date' && styles.controls__button_active
        )}
        onClick={() => setOrder('date')}
      >
        По дате
      </button>
      <button
        className={classNames(
          styles.controls__button,
          searchOrder === 'relevance' && styles.controls__button_active
        )}
        onClick={() => setOrder('relevance')}
      >
        По релевантности
      </button>
    </div>
  )
}

export default SearchOrderControls
