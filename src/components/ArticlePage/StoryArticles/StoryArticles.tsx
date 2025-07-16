'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser'

import { ARTICLE } from '@/constants/links'

import Icon from '@/ui/Icon/Icon'

import styles from './StoryArticles.module.scss'

import ArrowIcon from '@public/icons/arrow-down.svg'
import MoreIcon from '@public/icons/more/more.svg'
import MoreIconActive from '@public/icons/more/more-active.svg'
import MoreIconActiveMobile from '@public/icons/more/more-active-mobile.svg'

import { ArticleType } from '@/redux/slices/article/types'

type Props = {
  articles: ArticleType[]
}

const collapsedArticlesCount = 6

const StoryArticles = ({ articles }: Props) => {
  const [showAll, setShowAll] = useState(false)

  const getArticles = () =>
    showAll ? articles : articles.slice(0, collapsedArticlesCount)

  return (
    !!articles.length && (
      <div className={styles.storyArticles}>
        <ul className={styles.storyArticles__list}>
          {getArticles().map(article => (
            <li key={article.id}>
              <div className={styles.storyArticles__article_desc}>
                <Image
                  width={24}
                  height={24}
                  className={styles.storyArticles__icon}
                  src={article.publisher_logo_url}
                  alt={''}
                />
                <Link
                  href={ARTICLE + article.id}
                  className={styles.storyArticles__link}
                >
                  {parse(article.title)}
                </Link>
              </div>
              <a href={article.url} target={'_blank'} rel='noopener noreferrer'>
                <Icon
                  DefaultIcon={MoreIcon}
                  ActiveIcon={MoreIconActive}
                  HoverIcon={MoreIconActive}
                  title={'Подробнее'}
                  height={24}
                  width={116}
                  className={styles.storyArticles__more}
                  transition={false}
                  defaultIconOpacity={0.5}
                />
                <Icon
                  DefaultIcon={MoreIcon}
                  ActiveIcon={MoreIconActiveMobile}
                  HoverIcon={MoreIconActiveMobile}
                  title={'Подробнее'}
                  height={24}
                  width={24}
                  className={styles.storyArticles__more_mobile}
                  defaultIconOpacity={0.5}
                />
              </a>
            </li>
          ))}
        </ul>
        {articles.length > collapsedArticlesCount && (
          <button
            onClick={() => setShowAll(!showAll)}
            className={styles.storyArticles__show_all}
          >
            {showAll ? 'Скрыть' : `Показать еще`}
            <ArrowIcon style={showAll ? { transform: 'rotate(180deg)' } : {}} />
          </button>
        )}
      </div>
    )
  )
}

export default StoryArticles
