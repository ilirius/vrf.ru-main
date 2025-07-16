import {
  fetchProperties,
  FetchPropertiesReturnType
} from '@/redux/api/fetchProperties'
import { TematikaType, TopicType } from '@/redux/slices/topic/types'

export const fetchTopics = async () => {
  const properties: FetchPropertiesReturnType = await (
    await fetchProperties()
  ).json()

  const tematikaToTopic = (tematika: TematikaType): TopicType => {
    return {
      id: tematika.id,
      name: tematika.name,
      order: 0,
      visible: true,
      url_name: String(tematika.id)
    }
  }

  properties.topics = properties.tematiks?.map(tematikaToTopic)

  return properties.topics
}
