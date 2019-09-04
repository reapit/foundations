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

export function getUnixTime(date: dayjs.ConfigType) {
  return dayjs(date).valueOf()
}

export function closestToNow(datesArray: Array<dayjs.ConfigType>) {
  const timeCompare = dayjs().valueOf()

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
