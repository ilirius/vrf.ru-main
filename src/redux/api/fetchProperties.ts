import { BLOCK_ID } from '@/constants/general'

import { clientLog } from '@/utils/clientLogger'
import { getEndpointUrl } from '@/utils/urlUtils'

import { LocationType } from '@/redux/slices/location/types'
import { PublisherType } from '@/redux/slices/publisher/types'
import { TematikaType, TopicType } from '@/redux/slices/topic/types'

export type FetchPropertiesReturnType = {
  time?: number
  locations?: LocationType[]
  topics?: TopicType[]
  publishers?: PublisherType[]
  tematiks?: TematikaType[]
  tags?: {
    id: number
    name: string
    description: string
    visible: boolean
    type: 'MAIN' | 'OTHER'
  }[]
}

export const fetchProperties = async () => {
  const body = JSON.stringify({
    block_id: BLOCK_ID
  })
  const response = await fetch(getEndpointUrl('/api?action=properties'), {
    next: {
      revalidate: 60
    },
    method: 'POST',
    mode: 'cors',
    body,
    headers: new Headers({ 'content-type': 'application/json' })
  })

  clientLog({
    name: 'properties',
    bash: `curl -H '{ 'content-type': 'application/json' }' -d '${body}' '${process.env.API_URL}?action=properties' > test.json`,
    response: await response.clone().json()
  })
  return response
}
