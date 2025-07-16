import classNames from 'classnames'

import styles from './Pagination.module.scss'

import { StyleProps } from '@/types/styleProps'

type Props = StyleProps & {
  pageCount: number
  currentPage: number
}

const Pagination = ({ className, style, currentPage, pageCount }: Props) => {
  return (
    <div className={classNames(className, styles.pagination)} style={style}>
      <div
        className={classNames(
          styles.pagination__first,
          currentPage === 0 && styles.pagination__middle__active
        )}
      ></div>
      {pageCount > 2 && (
        <div
          className={classNames(
            styles.pagination__first,
            currentPage > 0 &&
              currentPage < pageCount - 1 &&
              styles.pagination__middle__active
          )}
        ></div>
      )}
      <div
        className={classNames(
          styles.pagination__last,
          currentPage === pageCount - 1 && styles.pagination__last__active
        )}
      ></div>
    </div>
  )
}

export default Pagination
