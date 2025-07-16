import parse from 'html-react-parser'

import Share from '@/components/ArticlePage/Share/Share'
import ShareCurrentURL from '@/components/ArticlePage/Share/ShareCurrentURL'

import { formatDate } from '@/utils/formatDate'
import { formatDomain } from '@/utils/urlUtils'

import ImageRenderer from '@/ui/ImageRenderer/ImageRenderer'

import styles from './Article.module.scss'

import Tags from './Tags/Tags'

import { ArticleType } from '@/redux/slices/article/types'

type Props = {
  article: ArticleType
  url?: string
  tags?: boolean
}

const Article = ({ article, url, tags }: Props) => {
  return (
    <div className={styles.article}>
      <div className={styles.article__image_container}>
        <a
          className={styles.article__image}
          href={article.url}
          target={'_blank'}
          rel='noopener noreferrer'
        >
          <ImageRenderer
            article={article}
            sizes={'(max-width: 430px) 217px, 466px'}
          />
        </a>
        <a
          className={styles.article__link}
          href={article.url}
          target={'_blank'}
          rel='noopener noreferrer'
        >
          Подробнее
        </a>
      </div>
      <div className={styles.article__description_container}>
        <div className={styles.article__description}>
          <div className={styles.article__row}>
            <span className={styles.article__url}>
              {formatDomain(article?.publisher_domain) || article.name}
            </span>
            <span className={styles.article__date}>
              {formatDate(article.date || article.create_date2)}
            </span>
          </div>
          <a
            href={article.url}
            target={'_blank'}
            rel='noopener noreferrer'
            className={styles.article__title}
          >
            <h2>{parse(article.title)}</h2>
          </a>
          <p className={styles.article__content}>
            {parse(article.announce || '')}
          </p>
          {tags && <Tags tags={article.tags2} />}
        </div>
        {url ? <Share url={url} /> : <ShareCurrentURL />}
      </div>
    </div>
  )
}

export default Article
