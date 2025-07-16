'use client'

import { JSX } from 'react'
import { Provider } from 'react-redux'

import { store } from './store'

const ProviderClient = ({ children }: any): JSX.Element => {
  return <Provider store={store}>{children}</Provider>
}

export default ProviderClient
