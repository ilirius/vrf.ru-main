import classNames from 'classnames'
import parse from 'html-react-parser'

import { BaseElement } from '@/components/ArticlesPage/ArticlesBlock/LargeArticle/LargeArticle'
import UrlContainer from '@/components/ArticlesPage/ArticlesBlock/UrlContainer/UrlContainer'

import { formatDate } from '@/utils/formatDate'

import ImageRenderer from '@/ui/ImageRenderer/ImageRenderer'

import styles from './SmallArticle.module.scss'

import { ArticleType } from '@/redux/slices/article/types'
import { StyleProps } from '@/types/styleProps'

type Props = StyleProps & {
  article: ArticleType
  loader?: boolean
  last?: boolean
}

const SmallArticle = ({ article, loader, className, style, last }: Props) => {
  return (
    <BaseElement
      article={article}
      loader={loader || article === undefined}
      className={classNames(
        className,
        styles.article,
        article === undefined && styles.articleGhost
      )}
      style={{
        ...(loader || last ? { border: 'none' } : {}),
        ...style
      }}
    >
      <div
        className={classNames(
          styles.article__small_image_container,
          loader && styles.article__small_image_container__loader
        )}
      >
        {!loader && article && (
          <>
            <UrlContainer article={article} />
            <ImageRenderer
              article={article}
              sizes={'(max-width: 420px) 135px, 240px'}
            />
          </>
        )}
      </div>
      <div
        className={classNames(
          styles.article__description,
          loader && styles.article__description__loader
        )}
      >
        <p>{!loader && parse(article?.title || '')}</p>
        <span
          className={classNames(
            styles.article__date,
            loader && styles.article__date__loader
          )}
        >
          {!loader && formatDate(article?.date || article?.create_date2)}
        </span>
      </div>
    </BaseElement>
  )
}

export default SmallArticle
