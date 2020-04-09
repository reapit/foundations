import * as React from 'react'
import dayjs from 'dayjs'
import { Button, ButtonGroup, Grid, GridItem, DATE_TIME_FORMAT } from '@reapit/elements'

export type DefaultFilterGroupProps = {
  appIds: string[]
  clientIds: string[]
  setDateFrom: (date: string) => void
  setDateTo: (date: string) => void
}

export enum FilterType {
  YESTERDAY = 0,
  LAST_WEEK = 1,
  LAST_MONTH = 2,
}

export type DateParams = {
  dateFrom: string
  dateTo: string
}

export const filterButtons = [
  {
    text: 'Yesterday',
    filterType: FilterType.YESTERDAY,
  },
  {
    text: 'Last Week',
    filterType: FilterType.LAST_WEEK,
  },
  {
    text: 'Last Month',
    filterType: FilterType.LAST_MONTH,
  },
]

export const prepareDefaultFilterDateParams = () => {
  const yesterday = dayjs()
    .subtract(1, 'day')
    .startOf('day')
    .format(DATE_TIME_FORMAT.YYYY_MM_DD)
  const yesterdayParams = {
    dateFrom: yesterday,
    dateTo: dayjs().format(DATE_TIME_FORMAT.YYYY_MM_DD),
  }

  const lastWeek = dayjs().subtract(1, 'week')
  const lastMonday = lastWeek
    .startOf('week')
    .add(1, 'day')
    .format(DATE_TIME_FORMAT.YYYY_MM_DD)
  const lastSunday = lastWeek
    .endOf('week')
    .add(1, 'day')
    .format(DATE_TIME_FORMAT.YYYY_MM_DD)
  const lastWeekParams = {
    dateFrom: lastMonday,
    dateTo: lastSunday,
  }

  const lastMonth = dayjs().subtract(1, 'month')
  const firstDayInMonth = lastMonth.startOf('month').format(DATE_TIME_FORMAT.YYYY_MM_DD)
  const lastDayInMonth = lastMonth.endOf('month').format(DATE_TIME_FORMAT.YYYY_MM_DD)
  const lastMonthParams = {
    dateFrom: firstDayInMonth,
    dateTo: lastDayInMonth,
  }
  return {
    yesterdayParams,
    lastWeekParams,
    lastMonthParams,
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
    const { yesterdayParams, lastWeekParams, lastMonthParams } = prepareDefaultFilterDateParams()
    switch (filterType) {
      case FilterType.YESTERDAY:
        handleFilter(yesterdayParams, setDateFrom, setDateTo)
        break
      case FilterType.LAST_WEEK:
        handleFilter(lastWeekParams, setDateFrom, setDateTo)
        break
      case FilterType.LAST_MONTH:
        handleFilter(lastMonthParams, setDateFrom, setDateTo)
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
    >
      {buttonText}
    </Button>
  )
}

export const DefaultFilterGroup: React.FC<DefaultFilterGroupProps> = ({ setDateFrom, setDateTo }) => {
  const [isActive, setIsActive] = React.useState(FilterType.LAST_WEEK)
  const onFilterButtonClick = React.useCallback(handleFilterButtonClick, [])

  return (
    <>
      <Grid className="is-vcentered is-mobile" isMultiLine>
        <GridItem className="is-narrow">
          <h6 className="title is-6">Filter by: </h6>
        </GridItem>
        <GridItem className="is-narrow">
          <ButtonGroup className="are-small">
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
        </GridItem>
      </Grid>
    </>
  )
}

export default DefaultFilterGroup
