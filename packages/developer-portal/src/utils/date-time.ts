import dayjs from 'dayjs'

export const isoDateToHuman = (isoDateStr: string) => dayjs(isoDateStr).format('DD MMM YYYY HH:mm:ss')
export const dateToHuman = (date: Date) => dayjs(date).format('DD MMM YYYY HH:mm:ss')
