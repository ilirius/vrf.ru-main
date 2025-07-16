'use client'
import { useRef, useState } from 'react'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'

import { ShareMedia, shareMedia } from '@/constants/shareMedia'

import useClickOutside from '@/hooks/useClickOutside'

import Icon from '@/ui/Icon/Icon'

import styles from './Share.module.scss'

import ClipboardIcon from '@public/icons/share/clipboard/clipboard.svg'
import ClipboardToastIcon from '@public/icons/share/clipboard/clipboard-toast.svg'
import ShareIcon from '@public/icons/share/share.svg'
import ShareIconActive from '@public/icons/share/share-active.svg'
import ShareIconHover from '@public/icons/share/share-hover.svg'

type Props = {
  url: string
}

const Share = ({ url }: Props) => {
  const [opened, setOpened] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)

  useClickOutside(menuRef, () => setOpened(false))

  const copied = () =>
    toast('Ссылка скопирована', {
      toastId: 'copied-toast',
      icon: <ClipboardToastIcon className={styles.share__icon_copied} />
    })

  const createLink = (media: ShareMedia) =>
    media.shareLink + encodeURIComponent(url)

  const copyToClipboard = () => {
    copy(url, {
      message: 'copied!'
    })
    copied()
  }

  return (
    <div className={styles.share}>
      <Icon
        className={styles.share__icon}
        ActiveIcon={ShareIconActive}
        isActive={opened}
        DefaultIcon={ShareIcon}
        HoverIcon={ShareIconHover}
        title={'Поделиться'}
        onClick={() => setOpened(!opened)}
        width={32}
        height={32}
        tabIndex={0}
      />
      {opened && (
        <div className={styles.share__menu_wrapper} ref={menuRef}>
          <ul>
            <li
              className={styles.share__item}
              onClick={copyToClipboard}
              onKeyDown={e => e.key == 'Enter' && copyToClipboard()}
              tabIndex={0}
            >
              <Icon
                ActiveIcon={ClipboardIcon}
                DefaultIcon={ClipboardIcon}
                HoverIcon={ClipboardIcon}
                height={24}
                title={'Скопировать ссылку'}
                width={24}
                style={{ cursor: 'pointer' }}
              />
              <span className={styles.share__copy_text}>
                Скопировать ссылку
              </span>
            </li>
            {shareMedia.map((media, idx) => (
              <li key={idx} className={styles.share__item}>
                <a
                  href={createLink(media)}
                  target={'_blank'}
                  rel={'noopener noreferrer'}
                  className={styles.share__item_link}
                >
                  <Icon
                    ActiveIcon={media.icon}
                    DefaultIcon={media.icon}
                    HoverIcon={media.icon}
                    title={media.alt}
                    height={24}
                    width={24}
                  />
                  {media.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Share
