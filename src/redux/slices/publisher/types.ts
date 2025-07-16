export type PublisherType = {
  domain: string
  id: number
  logo_url: string
  name: string
}

export type PublisherStateType = {
  publishers: PublisherType[]
  filteredPublisherIds?: number[]
  isLoading: boolean
  error: string
}

export const PUBLISHERS = 'publishers'
export type PUBLISHERS = typeof PUBLISHERS

export const GET_PUBLISHERS = `${PUBLISHERS}/getPublishersAction`
export type GET_PUBLISHERS = typeof GET_PUBLISHERS
