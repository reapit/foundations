import { Dayjs } from 'dayjs'

export const MAX_NUMBER_TRANSACTION_FIRST_PAGE = 3
export const MAX_NUMBER_TRANSACTION_PER_PAGE = 6

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

  while (developerCreateDate.isBefore(tempDate) && developerCreateDate.month() !== currentDate.month()) {
    tempDate = tempDate.add(-1, 'M')

    dates.push(tempDate)
  }

  return dates
}
