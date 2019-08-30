import dayjs from 'dayjs'

export function getTime(date: dayjs.ConfigType, is24HourTime: boolean = false) {
  return dayjs(date).format(is24HourTime ? 'HH:mm' : 'hh:mm A')
}
