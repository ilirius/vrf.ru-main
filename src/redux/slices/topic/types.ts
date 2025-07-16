export type TopicType = {
  id: number
  name: string
  order: number
  visible: boolean
  url_name: string
}

export type TematikaType = {
  id: number
  name: string
}

export type TopicStateType = {
  selectedTopic: TopicType | null
  allTopics: TopicType[]
  isLoading: boolean
  errors: string
}

export const TOPICS = 'topics'
export type TOPICS = typeof TOPICS

export const GET_TOPICS = `${TOPICS}/getTopicsAction`
export type GET_TOPICS = typeof GET_TOPICS

export const SET_TOPIC = `${TOPICS}/setTopicAction`
export type SET_TOPIC = typeof SET_TOPIC
