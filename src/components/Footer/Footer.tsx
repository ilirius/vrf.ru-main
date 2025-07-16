import React from 'react'
import Link from 'next/link'

import {
  HOME,
  Links,
  links,
  personalDataLink,
  rssLink
} from '@/constants/links'

import styles from './Footer.module.scss'

import SocialMedia from './SocialMedia/SocialMedia'

import VrfLogo from '@public/logos/vrf.svg'
import VrfLogoMobile from '@public/logos/vrf-mobile.svg'

const Footer = () => {
  const renderLinks = (array: Links) => {
    return (
      <ul>
        {array.map(link => (
          <li key={link.url} className={styles.footer__link}>
            <a href={link.url} target='_blank' rel='noopener noreferrer'>
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Link href={HOME}>
          <VrfLogo className={styles.footer__logo} />
          <VrfLogoMobile className={styles.footer__logo_mobile} />
        </Link>
        <div className={styles.footer__row}>
          <div className={styles.footer__column}>
            <p>&copy;&nbsp;Информационное Агентство ТАСС</p>
            <p>
              Свидетельство о регистрации СМИ №03247 выдано 02 апреля 1999 г.
              Государственным комитетом Российской Федерации по печати.
            </p>
            <p>
              Отдельные публикации могут содержать информацию, не
              предназначенную для пользователей до 16 лет.
            </p>
            <p>
              На информационном ресурсе применяются{' '}
              <a
                href={personalDataLink}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.footer__personal_data_link}
              >
                рекомендательные технологии.
              </a>
            </p>
            <a
              className={styles.footer__rss_link}
              href={rssLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              RSS Лента
            </a>
            <SocialMedia className={styles.footer__media_desktop} />
          </div>
          <div className={styles.footer__links}>
            <div>{renderLinks(links.slice(0, 6))}</div>
            <div>{renderLinks(links.slice(6, 10))}</div>
          </div>
          <SocialMedia className={styles.footer__media_mobile} />
        </div>
      </div>
    </footer>
  )
}

export default Footer
