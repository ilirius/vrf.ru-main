import { getEndpointUrl } from '@/utils/urlUtils'

export const fetchFeature = ({ storyId }: { storyId: number }) => {
  return fetch(getEndpointUrl('/api?action=features'), {
    next: {
      revalidate: 3600
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      story_id: storyId
    }),
    headers: new Headers({ 'content-type': 'application/json' })
  })
}
