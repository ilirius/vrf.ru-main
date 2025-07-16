import { notFound } from 'next/navigation'

import Article from '@/components/ArticlePage/ArticlePage'

import { fetchArticle } from '@/redux/api/fetchArticles'
import { ArticleType } from '@/redux/slices/article/types'

type ArticlePageParams = {
  id: number
}

const ArticlePage = async ({
  params
}: {
  params: Promise<ArticlePageParams>
}) => {
  const article: ArticleType = await fetchArticle({ id: (await params).id })
    .then(response => {
      if (response.ok) return response.json()
      else throw new Error()
    })
    .catch(() => {
      notFound()
    })

  return <Article article={article} />
}

export default ArticlePage
