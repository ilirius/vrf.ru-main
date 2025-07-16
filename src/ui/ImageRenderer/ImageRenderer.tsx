import Image from 'next/image'
import classNames from 'classnames'

import styles from './ImageRenderer.module.scss'

import { ArticleType } from '@/redux/slices/article/types'
import { StyleProps } from '@/types/styleProps'

type Props = StyleProps & {
  article: ArticleType
  sizes: string
  priority?: boolean
}

const ImageRenderer = ({ article, sizes, priority, className }: Props) => {
  return (
    <div className={classNames(className, styles.imageRenderer)}>
      {article?.image && (
        <Image
          alt={article?.title}
          src={article?.image}
          fill
          className={styles.imageRenderer__image}
          sizes={sizes}
          priority={priority}
        />
      )}
      <div className={styles.imageRenderer__placeholder} />
    </div>
  )
}

export default ImageRenderer
