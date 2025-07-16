import React, { ForwardedRef } from 'react'

import ArticlesBlock from '@/components/ArticlesPage/ArticlesBlock/ArticlesBlock'

type Props = {
  grid: boolean
  articlesPerBlock: number
}

const ArticlesLoader = (
  { grid, articlesPerBlock }: Props,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <div ref={ref}>
      <ArticlesBlock articlesPerBlock={articlesPerBlock} grid={grid} loader />
    </div>
  )
}

export default React.forwardRef(ArticlesLoader)
