import { BLOCK_ID } from '@/constants/general'

import { clientLog } from '@/utils/clientLogger'
import { getEndpointUrl } from '@/utils/urlUtils'

import { ArticleSearchOrder } from '@/redux/slices/article/types'

export type SortType =
  | 'COUNT'
  | 'RANK'
  | 'SEARCH'
  | 'SOCIAL'
  | 'DATE'
  | 'LOCAL'
  | 'RANK24'
  | 'SEARCH24'
  | 'SOCIAL24'
  | 'DATE24'
  | 'LOCAL24'

export type GetArticlesParams = {
  count: number
  topic?: number
  location?: number
  offset?: number
  isGoodFeed?: boolean
  search?: string | null
  isSearchBar?: boolean
  order?: ArticleSearchOrder
  filteredPublisherIDs?: number[]
  storyArticle?: number
  similarArticle?: number
  skipTopicCheck?: boolean
  imageWidth?: number
  imageHeight?: number
  filterArticles?: number[]
  publisherID?: string
  sortType?: SortType
}

type BodyType = {
  has_images: boolean
  block_id: number
  count: number
  fields: number
  image_width: number
  image_height: number
  topics?: number[]
  tematika_ids?: number[]
  loc_id?: number
  offset?: number
  is_good_feed?: boolean
  ctx: 'STORIES' | 'ARTICLES'
  similar_article_id?: number
  filter_ids?: number[]
  story_article?: number
  filter_publishers?: number[]
  publisher?: number
  sort_type?: SortType
}

const ArticleField = {
  // Дата и время создания статьи
  DATE: 1 << 0,
  // URL-адрес изображения
  IMAGE: 1 << 1,
  // Заголовок
  TITLE: 1 << 2,
  // Рубрика (топик)
  TOPIC: 1 << 3,
  // Анонс
  ANNOUNCE: 1 << 4,
  // Текст
  TEXT: 1 << 5,
  // Share-ссылка
  SHARE_URL: 1 << 6,
  // Идентификатор площадки
  PUBLISHER_ID: 1 << 7,
  // Название площадки
  PUBLISHER_NAME: 1 << 8,
  // Домен площадки
  PUBLISHER_DOMAIN: 1 << 9,
  // URL-адрес логотипа площадки
  PUBLISHER_LOGO_URL: 1 << 10,
  // Количество шар
  SHARES: 1 << 11,
  // Количество голосов (лайков)
  VOTES: 1 << 12,
  // Количество комментариев
  COMMENTS: 1 << 13,
  // Метка сюжета
  STORY_MARK: 1 << 14,
  // Ключевые слова
  KEYWORDS: 1 << 15,
  // Теги
  TAGS: 1 << 16,
  // Тренды
  TRENDS: 1 << 17,
  // Свойства полнотекстов
  FULLTEXT_PROPERTIES: 1 << 18,
  // Оригинальная ссылка
  ORIGINAL_URL: 1 << 19,
  // Идентификатор поста MT
  MT_POST_ID: 1 << 20,
  // Ранки
  RANKS: 1 << 21,
  // Все доступные поля
  MAX: (1 << 22) - 1
}

const getFields = () => {
  return (
    ArticleField.DATE |
    ArticleField.TITLE |
    ArticleField.PUBLISHER_DOMAIN |
    ArticleField.IMAGE |
    ArticleField.PUBLISHER_LOGO_URL |
    ArticleField.PUBLISHER_NAME |
    ArticleField.ANNOUNCE
  )
}

export const fetchArticles = async (params: GetArticlesParams) => {
  const body: BodyType = {
    has_images: true,
    block_id: BLOCK_ID,
    count: params.count,
    fields: getFields(),
    image_width: 628,
    image_height: 398,
    ctx: 'STORIES',
    sort_type: 'DATE'
  }

  if (params.topic) body.tematika_ids = [Number(params.topic)]
  if (params.location) body.loc_id = params.location
  if (params.offset) body.offset = params.offset
  if (params.isGoodFeed !== undefined) body.is_good_feed = params.isGoodFeed
  if (params.filteredPublisherIDs)
    body.filter_publishers = params.filteredPublisherIDs
  if (params.filterArticles) body.filter_ids = params.filterArticles
  if (params.similarArticle) {
    body.similar_article_id = params.similarArticle
    body.filter_ids = [params.similarArticle]
  }
  if (params.storyArticle) {
    body.story_article = params.storyArticle
    body.filter_ids = [params.storyArticle]
    body.ctx = 'ARTICLES'
  }
  if (params.publisherID) body.publisher = Number(params.publisherID)
  if (params.sortType) body.sort_type = params.sortType

  if (params.imageWidth && params.imageHeight) {
    body.image_width = params.imageWidth
    body.image_height = params.imageHeight
  }

  const response = await fetch(getEndpointUrl('/api?action=articles'), {
    next: {
      revalidate: 3
    },
    method: 'POST',
    body: JSON.stringify(body),
    headers: new Headers({ 'content-type': 'application/json' })
  })

  clientLog({
    name: 'articles',
    bash: `curl -H '{ 'content-type': 'application/json' }' -d '${JSON.stringify(body)}' '${process.env.API_URL}?action=articles' > test.json`,
    response: await response.clone().json()
  })

  return response
}

export const fetchArticlesSearch = (params: GetArticlesParams) => {
  return fetch(getEndpointUrl('/search-api/search'), {
    next: {
      revalidate: 3
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      query: params.search,
      limit: params.count,
      offset: params.offset,
      order: params.order,
      locale: 'ru_RU',
      agencyId: 11,
      imageSize: `${params.imageWidth}x${params.imageHeight}`
    }),
    headers: new Headers({ 'content-type': 'application/json' })
  })
}

export const fetchArticle = ({ id }: { id: number }) => {
  return fetch(getEndpointUrl('/api?action=article_details'), {
    next: {
      revalidate: 3600
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      block_id: BLOCK_ID,
      article_id: Number(id),
      fields: ArticleField.MAX,
      image_height: 274,
      image_width: 466
    }),
    headers: new Headers({ 'content-type': 'application/json' })
  })
}
