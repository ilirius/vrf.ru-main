import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PUBLISHERS, PublisherStateType, PublisherType } from './types'

const publisherInitialState: PublisherStateType = {
  isLoading: false,
  error: '',
  publishers: []
}

export const publisherSlice = createSlice({
  name: PUBLISHERS,
  initialState: publisherInitialState,
  reducers: {
    clearFilterPublishersAction: (state: PublisherStateType) => {
      state.filteredPublisherIds = []
    },
    togglePublisherAction: (
      state: PublisherStateType,
      { payload }: PayloadAction<{ id: number }>
    ) => {
      if (state.filteredPublisherIds === undefined) {
        state.filteredPublisherIds = []
      }
      const filtered = state.filteredPublisherIds.find(
        publisher => publisher == payload.id
      )
      if (filtered) {
        const index = state.filteredPublisherIds.indexOf(filtered)
        state.filteredPublisherIds.splice(index, 1)
        return
      }

      const publisherToToggle = state.publishers.find(
        publisher => publisher.id == payload.id
      )
      if (publisherToToggle) {
        state.filteredPublisherIds = [
          ...state.filteredPublisherIds,
          publisherToToggle.id
        ]
      }
    },
    getPublishersAction: (state: PublisherStateType) => {
      if (state.filteredPublisherIds === undefined) {
        state.filteredPublisherIds = []
      }
      state.isLoading = true
      state.error = ''
    },
    getPublishersSuccessAction: (
      state: PublisherStateType,
      {
        payload: { publishers }
      }: PayloadAction<{ publishers: PublisherType[] }>
    ) => {
      state.isLoading = false
      if (
        !state.publishers?.length ||
        !state.publishers.every(
          (publisher, index) => publisher.id === publishers[index].id
        )
      ) {
        state.publishers = [...publishers]
      }
    },
    getPublishersErrorAction: (
      state: PublisherStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      state.isLoading = false
      state.error = error
    }
  }
})

export const {
  clearFilterPublishersAction,
  togglePublisherAction,
  getPublishersAction,
  getPublishersErrorAction,
  getPublishersSuccessAction
} = publisherSlice.actions
export default publisherSlice.reducer
