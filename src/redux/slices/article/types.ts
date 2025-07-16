export type Tag = {
  feat_type: string
  level0: string
  feat: string
}

export type ArticleType = {
  id: number
  story_id: number
  story_mark: number
  url: string
  date: number
  create_date2: string
  image: string
  tags2: Tag[]
  title: string
  topic_id: number
  topic_name: string
  announce: string
  text: string | null
  share_url: string
  original_url: string
  pixel_hash: string
  publisher_id: number
  publisher_name: string
  publisher_domain: string
  publisher_logo_url: string
  shares: number
  votes: number
  comments: number
  keywords: string[]
  mt_post_id: number
  name?: string
}

export type ArticleSearchOrder = 'date' | 'relevance'

export type IArticlesState = {
  data: ArticleType[]
  searchBarData: ArticleType[]
  searchOrder: ArticleSearchOrder
  isSearchBar?: boolean
  isLoading: boolean
  requestedCount: number
  locationId: number | null
  filteredPublisherIDs?: number[]
  isEndOfFeed: boolean
  isSearchLoading: boolean
  notFound: boolean
  errors: string
  searchQuery: string
  searchBarOpened: boolean
}

export type ArticlesStateType = IArticlesState

export const ARTICLES = 'articles'
export type ARTICLES = typeof ARTICLES

export const GET_ARTICLES = `${ARTICLES}/getArticlesAction`
export type GET_ARTICLES = typeof GET_ARTICLES
