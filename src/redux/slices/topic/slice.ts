import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TOPICS, TopicStateType, TopicType } from './types'

const topicsInitialState: TopicStateType = {
  selectedTopic: null,
  allTopics: [],
  isLoading: true,
  errors: ''
}

export const topicsSlice = createSlice({
  name: TOPICS,
  initialState: topicsInitialState,
  reducers: {
    setTopicAction: (
      state: TopicStateType,
      action: PayloadAction<TopicType | null>
    ) => {
      state.selectedTopic = action.payload
    },
    setTopicsAction: (
      state: TopicStateType,
      action: PayloadAction<TopicType[]>
    ) => {
      state.allTopics = action.payload
    },
    getTopicsAction: (state: TopicStateType) => {
      state.isLoading = true
      state.errors = ''
    },
    getTopicsSuccessAction: (
      state: TopicStateType,
      { payload: topics }: PayloadAction<TopicType[]>
    ) => {
      state.isLoading = false
      state.allTopics = topics.filter(topic => topic.visible)
    },
    getTopicsErrorAction: (
      state: TopicStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      state.isLoading = false
      state.errors = error
    }
  }
})

export const {
  getTopicsErrorAction,
  getTopicsSuccessAction,
  setTopicAction,
  setTopicsAction
} = topicsSlice.actions
export default topicsSlice.reducer
