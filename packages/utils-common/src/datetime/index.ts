import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const DATE_TIME_FORMAT = {
  RFC3339: 'YYYY-MM-DDTHH:mm:ssZ',
  DATE_FORMAT: 'DD MMM YYYY',
  DATE_TIME_FORMAT: 'DD MMM YYYY HH:mm',
  YYYY_MM_DD: 'YYYY-MM-DD',
  YYYY_MM: 'YYYY-MM',
  MMMM_YYYY: 'MMMM YYYY',
}

export const getTime = (date: dayjs.ConfigType, is24HourTime: boolean = false) => {
  return dayjs(date).format(is24HourTime ? 'HH:mm' : 'hh:mm A')
}

export const getDate = (date: dayjs.ConfigType, format: string | undefined = DATE_TIME_FORMAT.DATE_FORMAT) => {
  return dayjs(date).format(format)
}

export const isSameDay = (date: dayjs.ConfigType) => {
  const toDate = dayjs()
  return dayjs(date).isSame(toDate, 'day')
}

export const toUTCTime = (value: dayjs.ConfigType, format: string | undefined = DATE_TIME_FORMAT.RFC3339): string => {
  if (!value) {
    return ''
  }
  const date = dayjs(value)
  return date.utc().format(format)
}

export const toLocalTime = (
  value: dayjs.ConfigType,
  format: string | undefined = DATE_TIME_FORMAT.DATE_TIME_FORMAT,
): string => {
  const date = dayjs(value)
  return date.local().format(format)
}
