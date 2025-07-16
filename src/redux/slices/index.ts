import { combineReducers } from '@reduxjs/toolkit'

import articlesReducer from './article/slice'
import { ArticlesStateType } from './article/types'
import locationReducer from './location/slice'
import { LocationStateType } from './location/types'
import publisherReducer from './publisher/slice'
import { PublisherStateType } from './publisher/types'
import topicsReducer from './topic/slice'
import { TopicStateType } from './topic/types'

export type StateType = {
  session: {
    articles: ArticlesStateType
  }
  local: {
    location: LocationStateType
    topics: TopicStateType
    publishers: PublisherStateType
  }
}

export const sessionReducer = combineReducers({ articles: articlesReducer })
export const rootReducer = combineReducers({
  location: locationReducer,
  topics: topicsReducer,
  publishers: publisherReducer
})
