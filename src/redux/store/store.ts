import createSagaMiddleware from '@redux-saga/core'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { rootReducer, sessionReducer } from '@/redux/slices'
import { listenerMiddleware } from '@/redux/store/middleware'
import sagas from '@/redux/store/sagas'

const sagaMiddleware = createSagaMiddleware()

export const localStorageKey = '_vrf:state'
const makeStore = () => {
  const preloadedState =
    typeof localStorage === 'undefined'
      ? {}
      : JSON.parse(localStorage.getItem(localStorageKey) || 'null')
  const store = configureStore({
    preloadedState: { ...preloadedState },
    reducer: combineReducers({ local: rootReducer, session: sessionReducer }),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(sagaMiddleware)
        .concat(listenerMiddleware.middleware)
  })
  sagaMiddleware.run(sagas)
  return store
}

export const store = makeStore()
