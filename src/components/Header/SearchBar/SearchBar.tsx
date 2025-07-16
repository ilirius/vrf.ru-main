'use client'
import { useRouter, useSearchParams } from 'next/navigation'

import SearchBarClient from '@/components/Header/SearchBar/SearchBarClient/SearchBarClient'

import { setQueryParam } from '@/utils/queryParams'

const SearchBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialValue = searchParams.get('search') || ''

  const handleSearch = (value: string) => {
    router.push('/?' + setQueryParam('search', value, searchParams))
  }

  return <SearchBarClient initialValue={initialValue} onSubmit={handleSearch} />
}

export default SearchBar
