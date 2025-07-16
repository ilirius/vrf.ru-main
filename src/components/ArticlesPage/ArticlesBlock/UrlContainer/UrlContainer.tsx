import { formatDomain } from '@/utils/urlUtils'

import styles from './UrlContainer.module.scss'

import { ArticleType } from '@/redux/slices/article/types'

type Props = {
  article: ArticleType
}

const UrlContainer = ({ article }: Props) => {
  const name =
    (article && formatDomain(article?.publisher_domain)) || article?.name

  return (
    name && (
      <div className={styles.urlContainer}>
        <span>{formatDomain(article?.publisher_domain) || article?.name}</span>
      </div>
    )
  )
}

export default UrlContainer
