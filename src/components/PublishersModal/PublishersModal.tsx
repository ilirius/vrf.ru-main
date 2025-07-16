'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveScroll } from 'react-remove-scroll'

import { PUBLISHER } from '@/constants/links'

import useClickOutside from '@/hooks/useClickOutside'

import GoBack from '@/ui/GoBack/GoBack'
import Input from '@/ui/Input/Input'
import Switch from '@/ui/Switch/Switch'

import styles from './PublishersModal.module.scss'

import CloseIcon from '@public/icons/x-close.svg'

import { StateType } from '@/redux/slices'
import {
  clearFilterPublishersAction,
  getPublishersAction,
  togglePublisherAction
} from '@/redux/slices/publisher/slice'
import { PublisherType } from '@/redux/slices/publisher/types'

type Props = {
  close: () => void
}

const PublishersModal = ({ close }: Props) => {
  const [inputValue, setInputValue] = useState('')

  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, close)

  const dispatch = useDispatch()

  const { publishers, filteredPublisherIds } = useSelector(
    (state: StateType) => state.local.publishers
  )

  useEffect(() => {
    document.body.setAttribute('style', 'margin-right: 0 !important')
    dispatch(getPublishersAction())
  }, [])

  const getFilteredPublishers = (): PublisherType[] => {
    return publishers.filter(
      publisher =>
        publisher.domain.toLowerCase().includes(inputValue.toLowerCase()) ||
        publisher.name.toLowerCase().includes(inputValue.toLowerCase())
    )
  }

  return (
    <>
      <div className={styles.modalBackground} />
      <RemoveScroll className={styles.modal}>
        <div className={styles.modal__container} ref={ref}>
          <GoBack onClick={close} className={styles.modal__back} />
          <div className={styles.modal__title}>
            <h2 className={styles.modal__h2}>Источники</h2>
            <button
              onClick={close}
              title={'Закрыть'}
              aria-label={'Закрыть'}
              className={styles.modal__close}
            >
              <CloseIcon />
            </button>
          </div>
          <Input
            onChange={e => setInputValue(e.target.value)}
            onClear={() => setInputValue('')}
            value={inputValue}
            placeholder={'Поиск по источникам'}
            className={styles.modal__input}
          />
          <div className={styles.modal__controls}>
            <div className={styles.modal__counter}>
              <div>
                Всего:{' '}
                <span className={styles.modal__bold}>{publishers?.length}</span>
              </div>
              <div>
                Выбрано:{' '}
                <span className={styles.modal__bold}>
                  {publishers?.length - (filteredPublisherIds?.length || 0)}
                </span>
              </div>
            </div>
            <button
              className={styles.modal__select_all}
              disabled={filteredPublisherIds?.length == 0}
              onClick={() => dispatch(clearFilterPublishersAction())}
            >
              Выбрать все
            </button>
          </div>
          <ul className={styles.modal__list}>
            {getFilteredPublishers()?.map(publisher => (
              <li key={publisher.id} className={styles.modal__item}>
                <div>
                  {publisher.logo_url ? (
                    <Image
                      src={publisher.logo_url}
                      alt={''}
                      width={24}
                      height={24}
                    />
                  ) : (
                    <div className={styles.modal__icon_placeholder} />
                  )}
                  <Link
                    href={PUBLISHER + publisher.id}
                    className={styles.modal__publisher_name}
                    onClick={close}
                  >
                    {publisher.name}{' '}
                    {publisher.domain !== publisher.name && (
                      <span className={styles.modal__domain}>
                        {publisher.domain}
                      </span>
                    )}
                  </Link>
                </div>
                <Switch
                  value={!filteredPublisherIds?.includes(publisher.id)}
                  onSwitch={() => dispatch(togglePublisherAction(publisher))}
                  className={styles.modal__switch}
                />
              </li>
            ))}
          </ul>
        </div>
      </RemoveScroll>
    </>
  )
}

export default PublishersModal
