import dzenIcon from '@public/icons/footer/dzen.svg'
import dzenIconHover from '@public/icons/footer/dzen-hover.svg'
import dzenIconMobile from '@public/icons/footer/dzen-mobile.svg'
import dzenIconHoverMobile from '@public/icons/footer/dzen-mobile-active.svg'
import okIcon from '@public/icons/footer/ok.svg'
import okIconHover from '@public/icons/footer/ok-hover.svg'
import okIconMobile from '@public/icons/footer/ok-mobile.svg'
import okIconHoverMobile from '@public/icons/footer/ok-mobile-active.svg'
import rutubeIcon from '@public/icons/footer/rutube.svg'
import rutubeIconHover from '@public/icons/footer/rutube-hover.svg'
import rutubeIconMobile from '@public/icons/footer/rutube-mobile.svg'
import rutubeIconHoverMobile from '@public/icons/footer/rutube-mobile-active.svg'
import tgIcon from '@public/icons/footer/tg.svg'
import tgIconHover from '@public/icons/footer/tg-hover.svg'
import tgIconMobile from '@public/icons/footer/tg-mobile.svg'
import tgIconHoverMobile from '@public/icons/footer/tg-mobile-active.svg'
import viberIcon from '@public/icons/footer/viber.svg'
import viberIconHover from '@public/icons/footer/viber-hover.svg'
import viberIconMobile from '@public/icons/footer/viber-mobile.svg'
import viberIconHoverMobile from '@public/icons/footer/viber-mobile-active.svg'
import vkIcon from '@public/icons/footer/vk.svg'
import vkIconHover from '@public/icons/footer/vk-hover.svg'
import vkIconMobile from '@public/icons/footer/vk-mobile.svg'
import vkIconHoverMobile from '@public/icons/footer/vk-mobile-active.svg'
import yandexIcon from '@public/icons/footer/yandex.svg'
import yandexIconHover from '@public/icons/footer/yandex-hover.svg'
import yandexIconMobile from '@public/icons/footer/yandex-mobile.svg'
import yandexIconHoverMobile from '@public/icons/footer/yandex-mobile-active.svg'

import { SVGComponent } from '@/types/svgComponent'

export type Link = {
  url: string
  title: string
}

export type Links = Link[]
export const tassLink = 'https://tass.ru'
export const links: Links = [
  {
    title: 'Новостная лента',
    url: 'https://tass.ru/search'
  },
  {
    title: 'Пресс-центр',
    url: 'https://tass.ru/press'
  },
  {
    title: 'Пресс-конференции',
    url: 'https://conference.tass.ru/'
  },
  {
    title: 'Интервью',
    url: 'https://tass.ru/interviews'
  },
  {
    title: 'Спецпроекты',
    url: 'https://tass.ru/specialprojects'
  },
  {
    title: 'Новости партнеров',
    url: 'https://tass.ru/novosti-partnerov'
  },
  {
    title: 'Карьера',
    url: 'https://tass.ru/career'
  },
  {
    title: 'Новости Агентства',
    url: 'https://tass.ru/novosti-agentstva'
  },
  {
    title: 'Об Агентстве',
    url: 'https://tass.ru/tass-today'
  },
  {
    title: 'Контакты',
    url: 'https://tass.ru/contacts'
  }
]

export const personalDataLink =
  'https://tass.ru/politika-obrabotki-personalnyh-dannyh'

export const rssLink = 'https://tass.ru/rss/v2.xml'

export type SocialMediaLink = {
  icon: SVGComponent
  iconHover: SVGComponent
  iconMobile: SVGComponent
  iconHoverMobile: SVGComponent
  url: string
  name: string
}
export type SocialMediaLinks = SocialMediaLink[]

export const socialMediaLinks: SocialMediaLinks = [
  {
    icon: tgIcon,
    iconHover: tgIconHover,
    iconMobile: tgIconMobile,
    iconHoverMobile: tgIconHoverMobile,
    url: 'https://t.me/tass_agency',
    name: 'Telegram'
  },
  {
    icon: yandexIcon,
    iconHover: yandexIconHover,
    iconMobile: yandexIconMobile,
    iconHoverMobile: yandexIconHoverMobile,
    url: 'https://yandex.ru/chat/#/join/a0bbfd04-919a-407d-a687-fd81d6afb959',
    name: 'Яндекс'
  },
  {
    icon: dzenIcon,
    iconHover: dzenIconHover,
    iconMobile: dzenIconMobile,
    iconHoverMobile: dzenIconHoverMobile,
    url: 'https://dzen.ru/tass',
    name: 'Дзен'
  },
  {
    icon: vkIcon,
    iconHover: vkIconHover,
    iconMobile: vkIconMobile,
    iconHoverMobile: vkIconHoverMobile,
    url: 'https://vk.com/tassagency',
    name: 'ВКонтакте'
  },
  {
    icon: okIcon,
    iconHover: okIconHover,
    iconMobile: okIconMobile,
    iconHoverMobile: okIconHoverMobile,
    url: 'https://ok.ru/tassagency',
    name: 'Одноклассники'
  },
  {
    icon: rutubeIcon,
    iconHover: rutubeIconHover,
    iconMobile: rutubeIconMobile,
    iconHoverMobile: rutubeIconHoverMobile,
    url: 'https://rutube.ru/channel/23950585/',
    name: 'Rutube'
  },
  {
    icon: viberIcon,
    iconHover: viberIconHover,
    iconMobile: viberIconMobile,
    iconHoverMobile: viberIconHoverMobile,
    url: 'https://invite.viber.com/?g2=AQBTstvT3ASgR0uyLFDI724ZaOJV%2BDMhReRFziBhD01r6hlSoWsw410eTp5CxXWp&lang=ru',
    name: 'Viber'
  }
]

export const ARTICLE = '/article/'
export const TOPIC = '/topic/'
export const TAG = '/tag/'
export const PUBLISHER = '/publisher/'
export const LOCATION = '/region/'
export const HOME = '/'
