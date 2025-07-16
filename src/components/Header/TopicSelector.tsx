'use client'
import { useState } from 'react'

import TopicsModal from '@/components/Header/TopicsModal/TopicsModal'

import { blankButton } from '@/utils/styles'

import TopicsIcon from '@public/icons/topics-mobile.svg'

const TopicSelector = () => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <button
        style={blankButton}
        aria-label={'Выбор раздела'}
        onClick={() => setOpened(true)}
      >
        <TopicsIcon />
      </button>
      {opened && <TopicsModal onClose={() => setOpened(false)} />}
    </>
  )
}

export default TopicSelector
