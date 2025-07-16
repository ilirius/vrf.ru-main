import 'moment/locale/ru'
import moment from 'moment'

export const formatDate = (date: number | string) => {
  if (!date) return null
  moment.locale('ru')
  return moment(date).format('D MMMM, HH:mm')
}
