import dayjs from 'dayjs'

export const DATE_FORMAT = 'DD MMM YYYY'

export function getTime(date: dayjs.ConfigType, is24HourTime: boolean = false) {
  return dayjs(date).format(is24HourTime ? 'HH:mm' : 'hh:mm A')
}

export function getDate(date: dayjs.ConfigType, format: string | undefined = DATE_FORMAT) {
  return dayjs(date).format(format)
}

export function isSameDay(date: dayjs.ConfigType) {
  const toDate = dayjs()
  return dayjs(date).isSame(toDate, 'day')
}
