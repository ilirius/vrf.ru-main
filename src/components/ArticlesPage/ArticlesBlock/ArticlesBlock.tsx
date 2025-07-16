'use client'

import { useSelector } from 'react-redux'

import styles from './ArticlesBlock.module.scss'

import LargeArticle from './LargeArticle/LargeArticle'
import SmallArticle from './SmallArticle/SmallArticle'

import { StateType } from '@/redux/slices'
import { ArticleType } from '@/redux/slices/article/types'

type Props = {
  index?: number
  articlesPerBlock: number
  grid: boolean
  loader?: boolean
}

const ArticlesBlock = ({ index, articlesPerBlock, grid, loader }: Props) => {
  const { data } = useSelector((state: StateType) => state.session.articles)

  const mappedData =
    index !== undefined
      ? data.slice(index * articlesPerBlock, (index + 1) * articlesPerBlock)
      : undefined
  const articles = Array.from({ length: articlesPerBlock }) as ArticleType[]
  mappedData?.forEach((article, index) => (articles[index] = article))

  const getLargeArticle = () => articles[0]
  const getNormalSizedArticles = (): ArticleType[] =>
    articles.slice(1, articlesPerBlock)

  const getConsecutiveWithLarge = () => {
    switch (articlesPerBlock) {
      case 15:
        return getNormalSizedArticles().slice(0, 8)
      case 12:
        return getNormalSizedArticles().slice(0, 6)
      case 6:
        return getNormalSizedArticles().slice(0, 2)
      default:
        return []
    }
  }

  const getOthers = () => {
    switch (articlesPerBlock) {
      case 15:
        return getNormalSizedArticles().slice(8, 15)
      case 12:
        return getNormalSizedArticles().slice(6, 12)
      case 6:
        return getNormalSizedArticles().slice(2, 6)
      default:
        return getNormalSizedArticles()
    }
  }

  if (mappedData?.length === 0 && !loader) return <></>

  return !!articles.length ? (
    <div className={styles.articleBlock}>
      {grid ? (
        <div className={styles.articleBlock__grid}>
          {articles.map((article, index) => (
            <SmallArticle
              article={article}
              key={article?.id || index}
              loader={loader}
            />
          ))}
        </div>
      ) : (
        <div className={styles.articleBlock__block}>
          <div className={styles.articleBlock__with_large}>
            <LargeArticle
              article={getLargeArticle()}
              priority={index === undefined ? false : index < 3}
              loader={loader}
            />
            <div className={styles.articleBlock__small_ones}>
              {getConsecutiveWithLarge().map((article, index) => (
                <SmallArticle
                  article={article}
                  key={article?.id || index}
                  loader={loader}
                />
              ))}
            </div>
          </div>
          <div className={styles.articleBlock__grid}>
            {getOthers().map((article, index) => (
              <SmallArticle
                article={article}
                key={article?.id || index}
                loader={loader}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <></>
  )
}

export default ArticlesBlock
