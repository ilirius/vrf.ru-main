'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { usePathname, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

import LocalArticles from '@/components/ArticlesPage/LocalArticles/LocalArticles'
import SearchOrderControls from '@/components/ArticlesPage/SearchOrderControls/SearchOrderControls'

import { defaultTopicName } from '@/constants/general'
import { LOCATION } from '@/constants/links'

import GoBackHistory from '@/ui/GoBack/GoBackHistory'

import styles from './ArticlesPage.module.scss'

import NotFound from './NotFound/NotFound'

import { StateType } from '@/redux/slices'
import {
  setIsEndOfFeedAction,
  setIsLoadingAction
} from '@/redux/slices/article/slice'
import { setTopicAction } from '@/redux/slices/topic/slice'

const Articles = dynamic(() => import('./Articles/Articles'), { ssr: false })

type Props = {
  isPositiveFeed: boolean
  topic?: string
  publisherID?: string
  locationID?: string
}

const ArticlesPage = ({
  isPositiveFeed,
  topic,
  publisherID,
  locationID
}: Props) => {
  const [isClient, setIsClient] = useState(false)

  const { notFound } = useSelector((state: StateType) => state.session.articles)
  const { allTopics, selectedTopic } = useSelector(
    (state: StateType) => state.local.topics
  )
  const { selectedLocation } = useSelector(
    (state: StateType) => state.local.location
  )

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || undefined

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTopicAction(allTopics.find(t => t.url_name === topic) || null))
  }, [topic])

  useEffect(() => {
    dispatch(setIsEndOfFeedAction(false))
    dispatch(setIsLoadingAction(false))
  }, [])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getHeadingText = () => {
    if (pathname.split('/')[1] === LOCATION.replaceAll('/', ''))
      return selectedLocation?.name
    if (selectedTopic === null) return defaultTopicName
    if (selectedTopic) return selectedTopic.name
  }

  return (
    <div className={styles.articles}>
      {isClient && (
        <>
          {!topic && !searchQuery && selectedLocation && !locationID && (
            <LocalArticles key={selectedLocation.id} />
          )}
          {searchQuery ? (
            <div className={styles.articles__searchControls}>
              <GoBackHistory />
              {!notFound && <SearchOrderControls />}
            </div>
          ) : (
            <h1 className={styles.articles__title}>{getHeadingText()}</h1>
          )}
          {notFound && <NotFound query={searchQuery || ''} />}
          <Articles
            searchQuery={searchQuery}
            topicName={String(topic)}
            grid={!!searchQuery}
            isPositiveFeed={isPositiveFeed}
            publisherID={publisherID}
            locationID={locationID}
          />
        </>
      )}
    </div>
  )
}

export default ArticlesPage
