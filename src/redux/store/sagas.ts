import { all, fork } from 'redux-saga/effects'

import { watchGetArticles } from '@/redux/slices/article/sagas'
import { watchGetLocations } from '@/redux/slices/location/sagas'
import { watchGetPublishers } from '@/redux/slices/publisher/sagas'
import { watchGetTopics } from '@/redux/slices/topic/sagas'

const rootSaga = function* () {
  yield all([
    fork(watchGetArticles),
    fork(watchGetLocations),
    fork(watchGetTopics),
    fork(watchGetPublishers)
  ])
}

export default rootSaga
