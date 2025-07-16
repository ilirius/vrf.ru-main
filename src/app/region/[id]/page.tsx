import { notFound } from 'next/navigation'

import ArticlesPage from '@/components/ArticlesPage/ArticlesPage'

import { fetchLocations } from '@/redux/api/fetchLocation'

type TopicPageParams = {
  id: string
}

const LocationPage = async ({
  params
}: {
  params: Promise<TopicPageParams>
}) => {
  const locations = await fetchLocations()

  const id = (await params).id
  if (!locations?.find(location => location.id === Number(id))) {
    notFound()
  }

  return <ArticlesPage isPositiveFeed={true} locationID={id} />
}

export default LocationPage
