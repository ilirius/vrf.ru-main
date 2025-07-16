'use client'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import { searchBarHidden } from '@/components/Header/Controls'
import PublishersModal from '@/components/PublishersModal/PublishersModal'

import Icon from '@/ui/Icon/Icon'
import Input from '@/ui/Input/Input'

import styles from './SearchBarClient.module.scss'

import Results from './Results/Results'

import SearchIcon from '@public/icons/search/search.svg'
import SearchIconActive from '@public/icons/search/search-active.svg'
import SearchIconHover from '@public/icons/search/search-hover.svg'
import FilterIcon from '@public/icons/sources/sources-mobile.svg'

import { StateType } from '@/redux/slices'
import { setSearchBarOpenAction } from '@/redux/slices/article/slice'

type Props = {
  onSubmit: (value: string) => void
  initialValue: string
}

const Search = ({ onSubmit, initialValue }: Props) => {
  const [value, setValue] = useState(initialValue)
  const [showResults, setShowResults] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [barHidden, setBarHidden] = useState(searchBarHidden())

  const [mounted, setMounted] = useState(false)

  const dispatch = useDispatch()
  const { notFound, searchBarOpened } = useSelector(
    (state: StateType) => state.session.articles
  )

  const inputRef = useRef<HTMLInputElement>(null)

  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search')

  useEffect(() => {
    const handleResize = () => {
      const hidden = searchBarHidden()
      if (hidden !== barHidden) setBarHidden(hidden)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [barHidden])

  useEffect(() => {
    if (searchQuery === null) setValue('')
  }, [searchQuery])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    submit()
  }

  const submit = () => {
    inputRef.current?.blur()
    setShowResults(false)
    onSubmit(value)
  }

  const closeSearch = () => {
    setShowResults(false)
    setValue('')
    dispatch(setSearchBarOpenAction(false))
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {barHidden && !searchBarOpened ? (
        <button
          onClick={() => dispatch(setSearchBarOpenAction(true))}
          className={styles.search__icon}
        >
          <Icon
            DefaultIcon={SearchIcon}
            HoverIcon={SearchIconHover}
            ActiveIcon={SearchIconActive}
            width={40}
            height={40}
            title={'Поиск по сайту...'}
          />
        </button>
      ) : (
        <>
          <form
            className={classNames(
              styles.search,
              !notFound && !searchQuery && styles.withSources
            )}
            onSubmit={handleSubmit}
          >
            <div className={styles.search__input_container}>
              <Input
                onChange={e => setValue(e.target.value)}
                value={value}
                onClear={closeSearch}
                reactRef={inputRef}
                onFocus={() => setShowResults(true)}
                onSubmit={handleSubmit}
                placeholder={'Поиск по сайту...'}
                className={styles.search__input}
                enterKeyHint={'search'}
                onFilterClick={() => setShowFilters(true)}
                filter
              />
              <FilterIcon
                className={
                  showResults
                    ? styles.search__filter
                    : styles.search__filter_disabled
                }
                tabIndex={0}
                onClick={() => setShowFilters(true)}
                onKeyDown={e => e.key == 'Enter' && setShowFilters(true)}
                aria-label={'Фильтры'}
                role={'button'}
              />
            </div>
            {showFilters && (
              <PublishersModal close={() => setShowFilters(false)} />
            )}
            {mounted && !showFilters && (
              <Results
                query={value}
                search={submit}
                disabled={!value.length || !showResults}
                onClose={() => setShowResults(false)}
              />
            )}
          </form>
        </>
      )}
    </>
  )
}

export default Search
