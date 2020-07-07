import * as React from 'react'
import dayjs from 'dayjs'
import { Button, ButtonGroup, H6, DATE_TIME_FORMAT, Section } from '@reapit/elements'

export type DefaultFilterGroupProps = {
  appIds: string[]
  clientIds: string[]
  setDateFrom: (date: string) => void
  setDateTo: (date: string) => void
}

export enum FilterType {
  TODAY = 0,
  LAST_7_DAYS = 1,
  LAST_30_DAYS = 2,
}

export type DateParams = {
  dateFrom: string
  dateTo: string
}

export const filterButtons = [
  {
    text: 'Today',
    filterType: FilterType.TODAY,
  },
  {
    text: 'Last 7 days ',
    filterType: FilterType.LAST_7_DAYS,
  },
  {
    text: 'Last 30 days ',
    filterType: FilterType.LAST_30_DAYS,
  },
]

export const prepareDefaultFilterDateParams = () => {
  const dayjsToday = dayjs().startOf('day')
  const today = dayjsToday.format(DATE_TIME_FORMAT.YYYY_MM_DD)
  const todayParams = {
    dateFrom: today,
    dateTo: today,
  }

  const last7DaysParams = {
    dateTo: today,
    dateFrom: dayjsToday.subtract(6, 'day').format(DATE_TIME_FORMAT.YYYY_MM_DD),
  }

  const last30DaysParams = {
    dateTo: today,
    dateFrom: dayjsToday.subtract(29, 'day').format(DATE_TIME_FORMAT.YYYY_MM_DD),
  }

  const defaultParams = last7DaysParams

  return {
    todayParams,
    last7DaysParams,
    last30DaysParams,
    defaultParams,
  }
}

export const handleFilter = (
  dateParams: DateParams,
  setDateFrom: (date: string) => void,
  setDateTo: (date: string) => void,
) => {
  const { dateFrom, dateTo } = dateParams
  setDateFrom(dateFrom)
  setDateTo(dateTo)
}

export const handleFilterButtonClick = (filterType, setDateFrom, setDateTo, setIsActive) => {
  return () => {
    const { todayParams, last7DaysParams, last30DaysParams } = prepareDefaultFilterDateParams()
    switch (filterType) {
      case FilterType.TODAY:
        handleFilter(todayParams, setDateFrom, setDateTo)
        break
      case FilterType.LAST_7_DAYS:
        handleFilter(last7DaysParams, setDateFrom, setDateTo)
        break
      case FilterType.LAST_30_DAYS:
        handleFilter(last30DaysParams, setDateFrom, setDateTo)
        break
      default:
        break
    }
    setIsActive(filterType)
  }
}

export const renderFiterButtons = (
  buttonText,
  buttonFilterType,
  isActive,
  onFilterButtonClick,
  setDateFrom,
  setDateTo,
  setIsActive,
) => {
  return (
    <Button
      type="button"
      className={`${isActive === buttonFilterType && 'is-info'}`}
      variant="secondary"
      onClick={onFilterButtonClick(buttonFilterType, setDateFrom, setDateTo, setIsActive)}
      fullWidth={false}
      key={buttonText}
    >
      {buttonText}
    </Button>
  )
}

export const DefaultFilterGroup: React.FC<DefaultFilterGroupProps> = ({ setDateFrom, setDateTo }) => {
  const [isActive, setIsActive] = React.useState(FilterType.LAST_7_DAYS)
  const onFilterButtonClick = React.useCallback(handleFilterButtonClick, [])

  return (
    <Section className="items-start" isFlex isFlexColumn hasBackground={false} hasPadding={false}>
      <H6 className="mb-2">Filter by</H6>
      <ButtonGroup>
        {filterButtons.map(button => {
          return renderFiterButtons(
            button.text,
            button.filterType,
            isActive,
            onFilterButtonClick,
            setDateFrom,
            setDateTo,
            setIsActive,
          )
        })}
      </ButtonGroup>
    </Section>
  )
}

export default DefaultFilterGroup
