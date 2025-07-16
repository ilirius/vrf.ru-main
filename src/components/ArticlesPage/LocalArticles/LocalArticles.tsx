'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import 'swiper/css/navigation'
import { useSelector } from 'react-redux'
import { Swiper as SwiperClass } from 'swiper'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { NavigationOptions } from 'swiper/types'

import SmallArticle from '@/components/ArticlesPage/ArticlesBlock/SmallArticle/SmallArticle'

import { LOCATION } from '@/constants/links'

import Pagination from '@/ui/Pagination/Pagination'

import 'swiper/css'
import styles from './LocalArticles.module.scss'

import Arrow from '@public/icons/arrow-down.svg'
import MoreIcon from '@public/icons/more/more.svg'

import { fetchArticles, GetArticlesParams } from '@/redux/api/fetchArticles'
import { StateType } from '@/redux/slices'
import { ArticleType } from '@/redux/slices/article/types'

const articlesLength = 12

const LocalArticles = () => {
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [articlesMobile, setArticlesMobile] = useState<ArticleType[][]>([[]])
  const [mobileSlideCurrent, setMobileSlideCurrent] = useState(0)
  const [swiperReady, setSwiperReady] = useState(false)

  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null)

  const prev = useRef<HTMLButtonElement>(null)
  const next = useRef<HTMLButtonElement>(null)

  const { selectedLocation } = useSelector(
    (state: StateType) => state.local.location
  )

  const getArticlesPerView = (): number => {
    const { innerWidth: width } = window
    if (width > 1440) return 6
    if (width > 1024) return 5
    if (width > 768) return 3
    return 4
  }

  const getArticlesPerViewMobile = (): number => {
    const { innerWidth: width } = window
    if (width > 420) return 4
    return 3
  }

  const setSlidesMobile = (data: ArticleType[]) => {
    const result: ArticleType[][] = []
    for (let i = 0; i < data.length; i += getArticlesPerViewMobile()) {
      const articlesOnSlide: ArticleType[] = []
      for (let j = 0; j < getArticlesPerViewMobile(); j++) {
        if (data[i + j]) articlesOnSlide.push(data[i + j])
      }
      result.push(articlesOnSlide)
    }
    setArticlesMobile(result)
  }

  useEffect(() => {
    const params: GetArticlesParams = {
      count: articlesLength,
      location: selectedLocation?.id,
      isGoodFeed: true
    }
    fetchArticles(params)
      .then(res => res.json())
      .then((data: ArticleType[]) => {
        setArticles(data)
        setSlidesMobile(data)
      })
  }, [selectedLocation])

  useEffect(() => {
    if (
      (prev.current && next.current) ||
      articles.length <= getArticlesPerView()
    ) {
      setSwiperReady(true)
    }
  }, [articles])

  const changeSlide = (swiper: SwiperClass) => {
    setMobileSlideCurrent(swiper.activeIndex)
  }

  const getPagesCount = () =>
    Math.ceil(articles.length / getArticlesPerViewMobile())

  useEffect(() => {
    if (swiperInstance && prev.current && next.current) {
      if (swiperInstance.params.navigation === true) {
        swiperInstance.params.navigation = {} as NavigationOptions
      }

      const nav = swiperInstance.params.navigation as NavigationOptions
      nav.prevEl = prev.current
      nav.nextEl = next.current

      if (
        swiperInstance.navigation &&
        typeof swiperInstance.navigation.init === 'function'
      ) {
        swiperInstance.navigation.destroy()
        swiperInstance.navigation.init()
        swiperInstance.navigation.update()
      }
    }
  }, [swiperInstance])

  return (
    articles.length > 0 && (
      <section className={styles.localArticles}>
        <div className={styles.localArticles__row}>
          <h2 className={styles.localArticles__title}>
            {selectedLocation?.name}
          </h2>
          <Link
            href={LOCATION + selectedLocation?.id}
            className={styles.localArticles__more}
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            <p>
              Все
              <span className={styles.localArticles__more__news}> новости</span>
            </p>
            <MoreIcon />
          </Link>
        </div>
        {articles.length > getArticlesPerView() && (
          <div className={styles.localArticles__nav_row}>
            <button
              ref={prev}
              className={styles.localArticles__nav}
              aria-label={'Назад'}
            >
              <Arrow className={styles.localArticles__left} />
            </button>
            <button
              ref={next}
              className={styles.localArticles__nav}
              aria-label={'Вперёд'}
            >
              <Arrow className={styles.localArticles__right} />
            </button>
          </div>
        )}
        {swiperReady && (
          <>
            <Swiper
              slidesPerView={getArticlesPerView()}
              spaceBetween={28}
              simulateTouch={false}
              modules={[Navigation]}
              onSwiper={setSwiperInstance}
              slidesPerGroup={2}
              className={styles.localArticles__swiper_desktop}
            >
              {articles?.map(article => (
                <SwiperSlide key={article.id}>
                  <SmallArticle
                    article={article}
                    className={styles.localArticles__article}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              className={styles.localArticles__swiper_mobile}
              spaceBetween={28}
              onSlideChange={changeSlide}
            >
              {articlesMobile?.map((articles, index) => (
                <SwiperSlide
                  key={index}
                  className={styles.localArticles__mobile_slide}
                >
                  {articles.map((article, index) => (
                    <SmallArticle
                      article={article}
                      key={index}
                      last={index === articles.length - 1}
                    />
                  ))}
                </SwiperSlide>
              ))}
            </Swiper>
            {getPagesCount() > 1 && (
              <Pagination
                pageCount={getPagesCount()}
                currentPage={mobileSlideCurrent}
                className={styles.localArticles__pagination}
              />
            )}
          </>
        )}
      </section>
    )
  )
}

export default LocalArticles
