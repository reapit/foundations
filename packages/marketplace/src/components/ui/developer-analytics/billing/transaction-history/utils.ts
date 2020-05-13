import { Dayjs } from 'dayjs'

export const formatRenderDate = (month: Dayjs) => month.format('MMMM YYYY')
export const formatRequestDate = (month: Dayjs) => month.format('YYYY-MM')
export const generatePreviousTransactionDate = ({
  currentDate,
  developerCreateDate,
}: {
  currentDate: Dayjs
  developerCreateDate: Dayjs
}) => {
  const dates: Dayjs[] = []
  let tempDate = currentDate

  while (developerCreateDate.isBefore(tempDate)) {
    tempDate = tempDate.add(-1, 'M')

    dates.push(tempDate)
  }

  return dates
}
