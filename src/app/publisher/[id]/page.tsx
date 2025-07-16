import PublisherPageComponent from '@/components/PublisherPage/PublisherPage'

type PublisherPageParams = {
  id: string
}

const PublisherPage = async ({
  params
}: {
  params: Promise<PublisherPageParams>
}) => {
  return <PublisherPageComponent id={(await params).id} />
}

export default PublisherPage
