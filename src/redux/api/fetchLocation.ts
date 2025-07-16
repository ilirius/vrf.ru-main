import { BLOCK_ID } from '@/constants/general'

import { getEndpointUrl } from '@/utils/urlUtils'

import {
  fetchProperties,
  FetchPropertiesReturnType
} from '@/redux/api/fetchProperties'

export type FetchedLocation = {
  geoname_id: number
  type: string
  name: string
  population: number
  latitude: number
  longitude: number
  time_zone: string
  utc_offset: number
}

export type FetchLocationReturnType = FetchedLocation[]

export const fetchLocation = () => {
  return fetch(getEndpointUrl('/api?action=location'), {
    next: {
      revalidate: 600
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      block_id: BLOCK_ID
    }),
    headers: new Headers({ 'content-type': 'application/json' })
  })
}

export const fetchLocations = async () => {
  const properties: FetchPropertiesReturnType = await (
    await fetchProperties()
  ).json()

  properties.locations = properties.locations?.filter(
    location => location.enabled
  )

  return properties.locations
}
