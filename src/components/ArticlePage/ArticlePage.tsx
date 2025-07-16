import Articles from '@/components/ArticlesPage/Articles/Articles'

import GoBackHistory from '@/ui/GoBack/GoBackHistory'

import styles from './ArticlePage.module.scss'

import Article from './Article/Article'
import SimilarArticles from './SimilarArticles/SimilarArticles'
import StoryArticles from './StoryArticles/StoryArticles'

import { fetchArticles } from '@/redux/api/fetchArticles'
import { ArticleType } from '@/redux/slices/article/types'

type Props = {
  article: ArticleType
}

const ArticlePage = async ({ article }: Props) => {
  const [storyArticlesBody, similarArticlesBody] = await Promise.all([
    fetchArticles({
      count: 12,
      storyArticle: article.id
    }),
    fetchArticles({
      count: 3,
      similarArticle: article.id
    })
  ])
  const storyArticles: ArticleType[] = await storyArticlesBody.json()
  const similarArticles: ArticleType[] = await similarArticlesBody.json()

  return (
    <div className={styles.articlePage}>
      <GoBackHistory className={styles.articlePage__back} />
      <Article article={article} />
      <StoryArticles articles={storyArticles} />
      <SimilarArticles articles={similarArticles} />
      <Articles grid />
    </div>
  )
}

export default ArticlePage
