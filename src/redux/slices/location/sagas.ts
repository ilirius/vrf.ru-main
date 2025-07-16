import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getLocationAutoErrorAction,
  getLocationAutoSuccessAction,
  getLocationsErrorAction,
  getLocationsSuccessAction
} from './slice'
import { GET_LOCATION_AUTO, GET_LOCATIONS } from './types'

import {
  fetchLocation,
  FetchLocationReturnType
} from '@/redux/api/fetchLocation'
import {
  fetchProperties,
  FetchPropertiesReturnType
} from '@/redux/api/fetchProperties'

function* getLocationsSaga() {
  try {
    const response: Response = yield call(fetchProperties)
    const body: FetchPropertiesReturnType = yield response.json()
    if (!body.locations) {
      return
    }
    yield put(getLocationsSuccessAction(body.locations))
  } catch (error) {
    yield put(getLocationsErrorAction(error as string))
  }
}

function* getLocationAutoSaga() {
  try {
    const response: Response = yield call(fetchLocation)
    const body: FetchLocationReturnType = yield response.json()
    if (!body.length) {
      return
    }
    yield put(getLocationAutoSuccessAction(body))
  } catch (error) {
    yield put(getLocationAutoErrorAction(error as string))
  }
}

export function* watchGetLocations() {
  yield takeLatest(GET_LOCATIONS, getLocationsSaga)
  yield takeLatest(GET_LOCATION_AUTO, getLocationAutoSaga)
}
