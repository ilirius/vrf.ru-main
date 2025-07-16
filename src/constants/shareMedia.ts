import okIcon from '@public/icons/share/ok/ok.svg'
import telegramIcon from '@public/icons/share/telegram/telegram.svg'
import viberIcon from '@public/icons/share/viber/viber.svg'
import vkIcon from '@public/icons/share/vk/vk.svg'

import { SVGComponent } from '@/types/svgComponent'

export type ShareMedia = {
  shareLink: string
  icon: SVGComponent
  text: string
  alt: string
}

export const shareMedia: ShareMedia[] = [
  {
    shareLink: 'https://vk.com/share.php?url=',
    icon: vkIcon,
    alt: 'VK Icon',
    text: 'ВКонтакте'
  },
  {
    shareLink: 'https://connect.ok.ru/offer?url=',
    icon: okIcon,
    alt: 'Ok Icon',
    text: 'Одноклассники'
  },
  {
    shareLink: 'https://t.me/share/url?url=',
    icon: telegramIcon,
    alt: 'Telegram Icon',
    text: 'Telegram'
  },
  {
    shareLink: 'viber://forward?text=Посмотрите эту новость ',
    icon: viberIcon,
    alt: 'Viber Icon',
    text: 'Viber'
  }
]
