import NavBarClient from './NavBarClient'

import { fetchTopics } from '@/redux/api/fetchTopics'

const NavBar = async () => {
  const topics = await fetchTopics()

  return <NavBarClient topics={topics} />
}

export default NavBar
