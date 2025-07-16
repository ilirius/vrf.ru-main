'use client'
import classNames from 'classnames'
import { ToastContainer } from 'react-toastify'

import styles from './ToastContainerComponent.module.scss'

import { IBM_Plex_Sans_Font } from '@/app/fonts'

const ToastContainerComponent = () => {
  return (
    <ToastContainer
      position={'bottom-right'}
      hideProgressBar
      closeButton={false}
      className={classNames(styles.toast, IBM_Plex_Sans_Font.className)}
      autoClose={3000}
      closeOnClick
      pauseOnHover
    />
  )
}

export default ToastContainerComponent
