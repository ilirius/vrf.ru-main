import { createListenerMiddleware } from '@reduxjs/toolkit'

import { localStorageKey } from '@/redux/store/store'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  predicate: () => true,
  effect: (action, listenerApi) => {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify(listenerApi.getState())
    )
  }
})
