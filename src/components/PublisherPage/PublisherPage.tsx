'use client'
import { useSelector } from 'react-redux'

import Articles from '@/components/ArticlesPage/Articles/Articles'

import GoBackHistory from '@/ui/GoBack/GoBackHistory'

import styles from './PublisherPage.module.scss'

import { StateType } from '@/redux/slices'

type Props = {
  id: string
}

const PublisherPage = ({ id }: Props) => {
  const { publishers } = useSelector(
    (state: StateType) => state.local.publishers
  )
  return (
    <section className={styles.publishersPage}>
      <GoBackHistory className={styles.publishersPage__back} />
      <h2 className={styles.publishersPage__h2}>
        {publishers.find(publisher => publisher.id === Number(id))?.name}
      </h2>
      <Articles isPositiveFeed={true} publisherID={id} grid={true} />
    </section>
  )
}

export default PublisherPage
