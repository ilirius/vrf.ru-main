import Article from '@/components/ArticlePage/Article/Article'

import { ARTICLE } from '@/constants/links'

import styles from './SimilarArticles.module.scss'

import { ArticleType } from '@/redux/slices/article/types'

type Props = {
  articles: ArticleType[]
}

const SimilarArticles = ({ articles }: Props) => {
  const getURL = (id: number) => {
    return process.env.URL + ARTICLE + id
  }

  return (
    <div className={styles.similarArticles}>
      {!!articles.length && (
        <>
          <h3 className={styles.similarArticles__title}>Похожие сюжеты</h3>
          <div className={styles.similarArticles__list}>
            {articles.map(article => (
              <div key={article.id} className={styles.similarArticles__item}>
                <Article article={article} url={getURL(article.id)} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SimilarArticles
