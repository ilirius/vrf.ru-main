export type ArticleRenderingProps = {
  articlesPerBlock: number
  blockCount: number
  imageWidth: number
  imageHeight: number
}

export const getArticlesRenderingProps = (
  grid: boolean = false,
  additional?: {
    usePreviousData: boolean
    previousDataLength: number
  }
): ArticleRenderingProps => {
  const props: ArticleRenderingProps = {
    articlesPerBlock: 0,
    blockCount: 0,
    imageWidth: 1,
    imageHeight: 1
  }
  if (typeof window === 'undefined') return props

  const { innerWidth: width } = window
  if (width > 1440) {
    if (!grid) {
      props.articlesPerBlock = 15
      props.blockCount = 4
    } else {
      props.articlesPerBlock = 6
      props.blockCount = 10
    }
  } else if (width > 1024) {
    if (!grid) {
      props.articlesPerBlock = 12
      props.blockCount = 5
    } else {
      props.articlesPerBlock = 5
      props.blockCount = 12
    }
  } else if (width > 768) {
    if (!grid) {
      props.articlesPerBlock = 6
      props.blockCount = 10
    } else {
      props.articlesPerBlock = 3
      props.blockCount = 20
    }
  } else if (width > 430) {
    if (!grid) {
      props.articlesPerBlock = 5
      props.blockCount = 12
    } else {
      props.articlesPerBlock = 2
      props.blockCount = 30
    }
  } else {
    props.articlesPerBlock = 5
    props.blockCount = 12
  }

  if (grid) {
    props.imageWidth = 240
    props.imageHeight = 160
  } else {
    props.imageWidth = 508
    props.imageHeight = 339
  }

  if (width < 430) {
    if (grid) {
      props.imageWidth = 135
      props.imageHeight = 90
    } else {
      props.imageWidth = 334
      props.imageHeight = 229
    }
  }

  if (additional && additional.usePreviousData) {
    props.blockCount = additional.previousDataLength / props.articlesPerBlock
  }

  return props
}
