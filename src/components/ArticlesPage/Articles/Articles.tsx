'use client'
import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDispatch, useSelector } from 'react-redux'

import ArticlesBlock from '@/components/ArticlesPage/ArticlesBlock/ArticlesBlock'

import { getArticlesRenderingProps } from '@/utils/articlesRenderingParams'

import ArticlesLoader from './ArticlesLoader/ArticlesLoader'

import { GetArticlesParams, SortType } from '@/redux/api/fetchArticles'
import { StateType } from '@/redux/slices'
import { clearAction, getArticlesAction } from '@/redux/slices/article/slice'

type Props = {
  searchQuery?: string
  topicName?: string
  locationID?: string
  isPositiveFeed?: boolean
  publisherID?: string
  grid: boolean
  sortType?: SortType
}

const Articles = ({
  searchQuery,
  isPositiveFeed = true,
  topicName,
  grid,
  publisherID,
  sortType,
  locationID
}: Props) => {
  const dispatch = useDispatch()
  const { data, isLoading, searchOrder, isEndOfFeed, notFound } = useSelector(
    (state: StateType) => state.session.articles
  )
  const { allTopics } = useSelector((state: StateType) => state.local.topics)
  const { filteredPublisherIds, publishers } = useSelector(
    (store: StateType) => store.local.publishers
  )

  const [articlesRenderingProps, setArticlesRenderingProps] = useState(
    getArticlesRenderingProps(grid, {
      usePreviousData: false,
      previousDataLength: data.length
    })
  )

  const onInView = (inView: boolean) => {
    if (!isLoading && inView && data.length !== 0)
      setArticlesRenderingProps({
        ...articlesRenderingProps,
        blockCount:
          articlesRenderingProps.blockCount +
          getArticlesRenderingProps(grid).blockCount
      })
  }

  const [loaderRef] = useInView({
    trackVisibility: false,
    onChange: onInView
  })

  const updateProps = useCallback(() => {
    const properties = getArticlesRenderingProps(grid)
    if (
      properties.articlesPerBlock !== articlesRenderingProps.articlesPerBlock &&
      !notFound
    ) {
      setArticlesRenderingProps(properties)
    }
  }, [grid, articlesRenderingProps, setArticlesRenderingProps, notFound])

  useEffect(() => {
    dispatch(clearAction())
  }, [])

  useEffect(() => {
    window.addEventListener('resize', updateProps)
    return () => window.removeEventListener('resize', updateProps)
  }, [grid, articlesRenderingProps, updateProps])

  useEffect(() => {
    const params: GetArticlesParams = {
      count: 60,
      isGoodFeed: isPositiveFeed,
      search: null,
      order: searchOrder,
      imageWidth: articlesRenderingProps.imageWidth,
      imageHeight: articlesRenderingProps.imageHeight,
      sortType,
      publisherID
    }
    if (searchQuery) params.search = searchQuery
    if (topicName)
      params.topic = allTopics.find(topic => topic.url_name === topicName)?.id
    if (locationID) params.location = Number(locationID)
    if (filteredPublisherIds?.length)
      params.filteredPublisherIDs = publishers
        .map(p => p.id)
        .filter(id => !filteredPublisherIds.includes(id))
    if (!isLoading) {
      dispatch(getArticlesAction(params))
    }
  }, [
    publishers,
    topicName,
    locationID,
    articlesRenderingProps,
    searchQuery,
    searchOrder,
    filteredPublisherIds
  ])

  useEffect(updateProps, [searchQuery, notFound])

  return (
    <>
      {!!data.length &&
        Array.from(
          { length: articlesRenderingProps.blockCount },
          (_, index) => (
            <ArticlesBlock
              index={index}
              grid={grid}
              articlesPerBlock={articlesRenderingProps.articlesPerBlock}
              key={index}
            />
          )
        )}
      {!isEndOfFeed && !notFound && (
        <>
          <ArticlesLoader
            grid={grid}
            ref={loaderRef}
            articlesPerBlock={articlesRenderingProps.articlesPerBlock}
          />
          {grid && (
            <ArticlesLoader
              grid
              articlesPerBlock={articlesRenderingProps.articlesPerBlock}
            />
          )}
        </>
      )}
    </>
  )
}

export default Articles
