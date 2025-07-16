import { Suspense } from 'react'
import Link from 'next/link'

import ClientWrapper from '@/components/Header/ClientWrapper'
import Controls from '@/components/Header/Controls'
import LocationSelector from '@/components/Header/LocationSelector/LocationSelector'
import NavBar from '@/components/Header/NavBar/NavBar'
import SearchBar from '@/components/Header/SearchBar/SearchBar'
import TopicSelector from '@/components/Header/TopicSelector'

import { HOME, tassLink } from '@/constants/links'

import styles from './Header.module.scss'

import LinkIcon from '@public/logos/tass.svg'
import LinkIconMobile from '@public/logos/tass-mobile.svg'
import VrfLogo from '@public/logos/vrf.svg'
import VrfLogoMobile from '@public/logos/vrf-mobile.svg'

const Header = () => {
  return (
    <ClientWrapper className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__controls_mobile}>
          <Link href={HOME} aria-label={'Главная страница'}>
            <VrfLogo className={styles.header__logo} />
            <VrfLogoMobile className={styles.header__logo_mobile} />
          </Link>
          <div className={styles.header__mobile_buttons}>
            <Link href={tassLink} target={'_blank'} rel='noopener noreferrer'>
              <LinkIconMobile />
            </Link>
            <div className={styles.header__location_mobile}>
              <LocationSelector skipFetching />
            </div>
            <TopicSelector />
          </div>
        </div>
        <Suspense fallback={null}>
          <SearchBar />
        </Suspense>
        <Controls className={styles.header__controls}>
          <div className={styles.header__top}>
            <LocationSelector />
            <Link
              href={tassLink}
              className={styles.header__tassLink}
              target={'_blank'}
              rel='noopener noreferrer'
            >
              <LinkIcon /> Новости tass.ru
            </Link>
          </div>
          <div className={styles.header__division} />
          <NavBar />
        </Controls>
      </div>
    </ClientWrapper>
  )
}

export default Header
