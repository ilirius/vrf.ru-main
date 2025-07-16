import { notFound } from 'next/navigation'

import ArticlesPage from '@/components/ArticlesPage/ArticlesPage'

import { fetchTopics } from '@/redux/api/fetchTopics'

type TopicPageParams = {
  name: string
}

const TopicPage = async ({ params }: { params: Promise<TopicPageParams> }) => {
  const topics = await fetchTopics()

  if (!topics?.find(async topic => topic.url_name === (await params).name)) {
    notFound()
  }

  return <ArticlesPage isPositiveFeed={true} topic={(await params).name} />
}

export default TopicPage
