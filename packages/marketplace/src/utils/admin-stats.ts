import dayjs from 'dayjs'
import { Area, Range } from '../components/pages/admin-stats'

export type DateRange = {
  from: Date
  to: Date
}

export const getDateRange = (range: Omit<Range, 'ALL'>): DateRange => {
  if (range === 'WEEK') {
    return {
      from: dayjs()
        .subtract(7, 'day')
        .toDate(),
      to: new Date(),
    }
  }
  if (range === 'MONTH') {
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    return {
      from: firstDayOfMonth,
      to: now,
    }
  }
  throw Error('Invalid range value')
}

export type ChartDataType = {
  labels: string[]
  data: number[]
}

export const getChartData = (data: any[], range: Range): ChartDataType => {
  const result = {}
  const dateRange = getDateRange(range)
  let formatedFromDate = dayjs(dateRange.from)
    .startOf('day')
    .toDate()
  let formatedToDate = dayjs(dateRange.to)
    .startOf('day')
    .toDate()
  while (formatedFromDate <= formatedToDate) {
    const count = numOfObjectCreatedInDate(data, formatedFromDate)
    result[dayjs(formatedFromDate).format('DD/MM/YYYY')] = count

    formatedFromDate = dayjs(formatedFromDate)
      .add(1, 'day')
      .toDate()
  }
  return { labels: Object.keys(result), data: Object.values(result) }
}

/**
 *
 * get number of objects in data which created at date
 * @param data
 * @param date
 */
export const numOfObjectCreatedInDate = (data: any[], date: Date): number =>
  data.reduce((accumulator, currentValue) => {
    const createdDate = dayjs(currentValue.created)
      .startOf('day')
      .toDate()
    if (createdDate.getTime() === date.getTime()) return accumulator + 1
    return accumulator
  }, 0)

export const getDataLabel = (area: Area): string => {
  switch (area) {
    case 'APPS':
      return 'Apps'
    case 'DEVELOPERS':
      return 'Developers'
    case 'INSTALLATIONS':
      return 'Installations'
  }
}

export const getChartConfig = (labels: string[], data: number[], area: Area) => ({
  labels,
  datasets: [
    {
      label: getDataLabel(area),
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: data,
    },
  ],
})
