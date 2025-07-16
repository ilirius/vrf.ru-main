import { call, put, takeLatest } from 'redux-saga/effects'

import { getTopicsErrorAction, getTopicsSuccessAction } from './slice'
import { GET_TOPICS, TopicType } from './types'

import { fetchTopics } from '@/redux/api/fetchTopics'

function* getTopicsSaga() {
  try {
    const topics: TopicType[] = yield call(fetchTopics)
    if (!topics) {
      return
    }
    yield put(getTopicsSuccessAction(topics))
  } catch (error) {
    yield put(getTopicsErrorAction(error as string))
  }
}

export function* watchGetTopics() {
  yield takeLatest(GET_TOPICS, getTopicsSaga)
}
