'use client'
import { SocialMediaLink, socialMediaLinks } from '@/constants/links'

import Icon from '@/ui/Icon/Icon'

import styles from './SocialMedia.module.scss'

import { StyleProps } from '@/types/styleProps'

const SocialMedia = ({ className }: StyleProps) => {
  return (
    <div className={`${styles.media} ${className}`}>
      {socialMediaLinks.map((link: SocialMediaLink, index: number) => (
        <a
          key={index}
          target='_blank'
          rel='noopener noreferrer'
          href={link.url}
        >
          <Icon
            ActiveIcon={link.iconHover}
            DefaultIcon={link.icon}
            HoverIcon={link.iconHover}
            title={link.name}
            height={40}
            width={40}
            className={styles.media__icon}
          />
          <Icon
            ActiveIcon={link.iconHoverMobile}
            DefaultIcon={link.iconMobile}
            HoverIcon={link.iconHoverMobile}
            title={link.name}
            height={32}
            width={32}
            className={styles.media__mobile_icon}
          />
        </a>
      ))}
    </div>
  )
}

export default SocialMedia
