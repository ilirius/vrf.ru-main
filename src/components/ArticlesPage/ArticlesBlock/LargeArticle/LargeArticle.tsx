import { ReactNode } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import parse from 'html-react-parser'

import UrlContainer from '@/components/ArticlesPage/ArticlesBlock/UrlContainer/UrlContainer'

import { ARTICLE } from '@/constants/links'

import { formatDate } from '@/utils/formatDate'

import ImageRenderer from '@/ui/ImageRenderer/ImageRenderer'

import styles from './LargeArticle.module.scss'

import { ArticleType } from '@/redux/slices/article/types'
import { StyleProps } from '@/types/styleProps'

type Props = {
  article: ArticleType
  priority?: boolean
  loader?: boolean
}

export type BaseElementProps = StyleProps & {
  children: ReactNode
  loader?: boolean
  article: ArticleType
}

export const BaseElement = ({
  children,
  loader,
  article,
  className,
  style
}: BaseElementProps) => {
  if (loader)
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  else
    return (
      <Link className={className} href={ARTICLE + article?.id} style={style}>
        {children}
      </Link>
    )
}

const LargeArticle = ({ article, priority, loader }: Props) => {
  return (
    <BaseElement
      loader={loader || article === undefined}
      article={article}
      className={styles.article}
      style={loader ? { border: 'none' } : {}}
    >
      <div
        className={classNames(
          styles.article__image_container,
          loader && styles.article__image_container__loader
        )}
      >
        {!loader && article && (
          <>
            <UrlContainer article={article} />
            <ImageRenderer
              article={article}
              sizes={'(max-width: 420px) 344px, 508px'}
              priority={priority}
            />
          </>
        )}
      </div>
      <h4
        className={classNames(
          styles.article__title,
          loader && styles.article__title__loader
        )}
      >
        {!loader && parse(article?.title || '')}
      </h4>
      <p
        className={classNames(
          styles.article__text,
          loader && styles.article__text__loader
        )}
      >
        {!loader && parse(article?.announce || '')}
      </p>
      <span
        className={classNames(
          styles.article__date,
          loader && styles.article__date__loader
        )}
      >
        {!loader && formatDate(article?.date || article?.create_date2)}
      </span>
    </BaseElement>
  )
}
export default LargeArticle
