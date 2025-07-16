import { call, put, takeLatest } from 'redux-saga/effects'

import { getPublishersErrorAction, getPublishersSuccessAction } from './slice'
import { GET_PUBLISHERS } from './types'

import {
  fetchProperties,
  FetchPropertiesReturnType
} from '@/redux/api/fetchProperties'

function* getPublishersSaga() {
  try {
    const response: Response = yield call(fetchProperties)
    const body: FetchPropertiesReturnType = yield response.json()
    if (!body.publishers) {
      return
    }
    yield put(getPublishersSuccessAction({ publishers: body.publishers }))
  } catch (error) {
    yield put(getPublishersErrorAction(error as string))
  }
}

export function* watchGetPublishers() {
  yield takeLatest(GET_PUBLISHERS, getPublishersSaga)
}
