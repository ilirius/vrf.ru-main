import { all, call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

import { getArticlesErrorAction, getArticlesSuccessAction } from './slice'
import { ArticleType, GET_ARTICLES } from './types'

import {
  fetchArticles,
  fetchArticlesSearch,
  GetArticlesParams
} from '@/redux/api/fetchArticles'

function* getArticlesSaga({
  payload: params
}: PayloadAction<GetArticlesParams>) {
  let fetchFunction
  if (params.search !== null) fetchFunction = fetchArticlesSearch
  else fetchFunction = fetchArticles

  type FetchReturnType = { articles: ArticleType[] } | ArticleType[]

  const get = (value: FetchReturnType) => {
    return (
      (value as { articles: ArticleType[] }).articles ||
      (value as ArticleType[])
    )
  }

  const setUpForArticlesSlice = (articles: ArticleType[]) => {
    const objectToPut: {
      articles?: ArticleType[]
      searchBarArticles?: ArticleType[]
    } = {}

    if (params.isSearchBar) objectToPut.searchBarArticles = articles
    else objectToPut.articles = articles
    return objectToPut
  }

  try {
    if (params.isGoodFeed !== false) {
      const response: Response = yield call(fetchFunction, params)
      const allArticles: FetchReturnType = yield response.json()
      const transformed = get(allArticles)
      yield put(getArticlesSuccessAction(setUpForArticlesSlice(transformed)))
    } else {
      const paramsPositive = { ...params }
      const paramsAll = { ...params }

      paramsPositive.isGoodFeed = true
      paramsAll.count *= 4
      const response: Response[] = yield all([
        call(fetchFunction, paramsPositive),
        call(fetchFunction, paramsAll)
      ])

      const positiveArticles: FetchReturnType = yield response[0].json()
      const allArticles: FetchReturnType = yield response[1].json()

      const negativeArticles = get(allArticles)
        .filter(
          article =>
            get(positiveArticles).find(
              positiveArticle => positiveArticle.id === article.id
            ) === undefined
        )
        .slice(0, params.count)

      yield put(
        getArticlesSuccessAction(setUpForArticlesSlice(negativeArticles))
      )
    }
  } catch (error) {
    yield put(getArticlesErrorAction(error as string))
  }
}

export function* watchGetArticles() {
  yield takeLatest(GET_ARTICLES, getArticlesSaga)
}
