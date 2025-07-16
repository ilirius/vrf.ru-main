import Articles from '@/components/ArticlesPage/Articles/Articles'

import GoBackHistory from '@/ui/GoBack/GoBackHistory'

import styles from './StoryPage.module.scss'

const StoryPage = () => {
  return (
    <section className={styles.storyPage}>
      <GoBackHistory className={styles.storyPage__back} />
      <h2 className={styles.storyPage__h2}>Сюжеты</h2>
      <Articles isPositiveFeed={true} grid={true} sortType={'COUNT'} />
    </section>
  )
}

export default StoryPage
