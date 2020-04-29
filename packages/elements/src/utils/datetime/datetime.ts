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

export function getTime(date: dayjs.ConfigType, is24HourTime: boolean = false) {
  return dayjs(date).format(is24HourTime ? 'HH:mm' : 'hh:mm A')
}

export function getDate(date: dayjs.ConfigType, format: string | undefined = DATE_TIME_FORMAT.DATE_FORMAT) {
  return dayjs(date).format(format)
}

export function isSameDay(date: dayjs.ConfigType) {
  const toDate = dayjs()
  return dayjs(date).isSame(toDate, 'day')
}

export function closestTo(dateCompare: dayjs.ConfigType, datesArray: Array<dayjs.ConfigType>) {
  const timeCompare = dayjs(dateCompare).valueOf()

  if (isNaN(timeCompare)) {
    return new Date(NaN)
  }

  let result: any
  let minDistance: any
  datesArray.forEach(function(date) {
    const currentTime = dayjs(date).valueOf()

    if (isNaN(currentTime)) {
      result = new Date(NaN)
      minDistance = NaN
      return
    }

    const distance = currentTime - timeCompare
    if (distance > 0 && (result == null || distance < minDistance)) {
      result = date
      minDistance = distance
    }
  })

  return result
}

export function toUTCTime(value: dayjs.ConfigType, format: string | undefined = DATE_TIME_FORMAT.RFC3339): string {
  if (!value) {
    return ''
  }
  const date = dayjs(value)
  return date.utc().format(format)
}

export function toLocalTime(
  value: dayjs.ConfigType,
  format: string | undefined = DATE_TIME_FORMAT.DATE_TIME_FORMAT,
): string {
  const date = dayjs(value)
  return date.local().format(format)
}
