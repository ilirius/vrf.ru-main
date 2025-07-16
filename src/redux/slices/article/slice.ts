import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  ARTICLES,
  ArticleSearchOrder,
  ArticlesStateType,
  ArticleType
} from './types'

import { GetArticlesParams } from '@/redux/api/fetchArticles'

const articlesInitialState: ArticlesStateType = {
  searchBarData: [],
  searchOrder: 'date',
  isEndOfFeed: false,
  requestedCount: 0,
  searchQuery: '',
  locationId: null,
  isLoading: false,
  isSearchBar: false,
  notFound: false,
  isSearchLoading: false,
  errors: '',
  filteredPublisherIDs: [],
  data: [],
  searchBarOpened: false
}

export const articlesSlice = createSlice({
  name: ARTICLES,
  initialState: articlesInitialState,
  reducers: {
    clearAction: (state: ArticlesStateType) => {
      state.data = []
    },
    setIsLoadingAction: (
      state: ArticlesStateType,
      params: PayloadAction<boolean>
    ) => {
      state.isLoading = params.payload
    },
    setSearchBarOpenAction: (
      state: ArticlesStateType,
      params: PayloadAction<boolean>
    ) => {
      state.searchBarOpened = params.payload
    },
    setIsEndOfFeedAction: (
      state: ArticlesStateType,
      params: PayloadAction<boolean>
    ) => {
      state.isEndOfFeed = params.payload
    },
    getArticlesAction: (
      state: ArticlesStateType,
      params: PayloadAction<GetArticlesParams>
    ) => {
      // Handle articles list in search bar
      if (params.payload.isSearchBar) {
        state.isSearchLoading = true
        state.searchBarData = []
      } else {
        // Clear previous article list if parameters have changed
        if (
          state.searchOrder !== params.payload.order ||
          state.locationId != params.payload.location ||
          state.searchQuery != (params.payload.search || '') ||
          state.filteredPublisherIDs?.length !=
            params.payload.filteredPublisherIDs?.length
        ) {
          state.data = []
        } else {
          if (params.payload.count > state.data.length)
            params.payload.count -= state.data.length
          params.payload.filterArticles = state.data.map(article => article.id)
        }

        // Set parameters for future checking
        state.isEndOfFeed = false
        state.isLoading = true
        state.notFound = false
        state.searchQuery = params.payload.search || ''
        state.locationId = params.payload.location || null
        state.filteredPublisherIDs = params.payload.filteredPublisherIDs
      }

      state.errors = ''
      state.isSearchBar = params.payload.isSearchBar
      state.requestedCount = params.payload.count
    },
    getArticlesSuccessAction: (
      state: ArticlesStateType,
      {
        payload: { articles, searchBarArticles }
      }: PayloadAction<{
        articles?: ArticleType[]
        searchBarArticles?: ArticleType[]
      }>
    ) => {
      // Hide loader if zero sized response has returned
      if (state.data.length && articles?.length)
        state.isEndOfFeed =
          state.data[state.data.length - 1].id ==
          articles[articles.length - 1].id

      state.isLoading = state.isSearchLoading = false

      // Set article list to corresponding field in the state
      if (searchBarArticles) {
        state.searchBarData = searchBarArticles
      } else if (articles) {
        state.data = [...state.data, ...articles]
      }

      // End of feed (should hide loader) check
      if (state.data.length === 0 && articles?.length === 0) {
        state.isEndOfFeed = true
      }
      if (
        !state.isSearchBar &&
        state.requestedCount > (articles?.length || 0)
      ) {
        state.isEndOfFeed = true
      }

      // Not found check
      if (!articles?.length && !state.isSearchBar && state.searchQuery) {
        state.notFound = true
      } else if (articles?.length && !state.isSearchBar && state.searchQuery) {
        state.notFound = false
      }
    },
    getArticlesErrorAction: (
      state: ArticlesStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      state.isLoading = state.isSearchLoading = false
      state.errors = error
    },
    setArticleSearchOrderAction: (
      state: ArticlesStateType,
      { payload: order }: PayloadAction<ArticleSearchOrder>
    ) => {
      state.data = []
      state.searchOrder = order
    }
  }
})

export const {
  setIsLoadingAction,
  setIsEndOfFeedAction,
  getArticlesErrorAction,
  getArticlesSuccessAction,
  getArticlesAction,
  setArticleSearchOrderAction,
  clearAction,
  setSearchBarOpenAction
} = articlesSlice.actions
export default articlesSlice.reducer
