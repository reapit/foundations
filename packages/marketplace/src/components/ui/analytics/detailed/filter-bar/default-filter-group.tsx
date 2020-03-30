import * as React from 'react'
import dayjs from 'dayjs'
import { Button, ButtonGroup, Grid, GridItem } from '@reapit/elements'
import { AppUsageStatsParams } from '@/actions/app-usage-stats'

type DefaultFilterGroupProps = {
  appIds: string[]
  clientIds: string[]
  loadStats: (params: AppUsageStatsParams) => void
  setDateFrom: (date: string) => void
  setDateTo: (date: string) => void
}

enum FilterType {
  YESTERDAY = 0,
  LAST_WEEK = 1,
  LAST_MONTH = 2,
}

export const prepareDefaultFilterDateParams = () => {
  const yesterday = dayjs()
    .subtract(1, 'day')
    .toISOString()
  const yesterdayParams = {
    dateFrom: yesterday,
    dateTo: dayjs().toISOString(),
  }

  const lastWeek = dayjs().subtract(1, 'week')
  const lastMonday = lastWeek.day(1).toISOString()
  const lastSunday = lastWeek.day(7).toISOString()
  const lastWeekParams = {
    dateFrom: lastMonday,
    dateTo: lastSunday,
  }

  const lastMonth = dayjs().subtract(1, 'month')
  const firstDayInMonth = lastMonth.startOf('month').toISOString()
  const lastDayInMonth = lastMonth.endOf('month').toString()
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

export const handleFilter = (loadStats, dateParams, appIds, setDateFrom, setDateTo) => {
  setDateFrom(dateParams.dateFrom)
  setDateTo(dateParams.dateTo)
  loadStats({
    appId: appIds,
    ...dateParams,
  })
}

const DefaultFilterGroup: React.FC<DefaultFilterGroupProps> = props => {
  const { appIds, clientIds, loadStats, setDateFrom, setDateTo } = props
  const [isActive, setIsActive] = React.useState<FilterType | null>(null)

  const onFilterButtonClick = filterType => {
    return () => {
      const { yesterdayParams, lastWeekParams, lastMonthParams } = prepareDefaultFilterDateParams()
      switch (filterType) {
        case FilterType.YESTERDAY:
          handleFilter(loadStats, yesterdayParams, appIds, setDateFrom, setDateTo)
          break
        case FilterType.LAST_WEEK:
          handleFilter(loadStats, lastWeekParams, appIds, setDateFrom, setDateTo)
          break
        case FilterType.LAST_MONTH:
          handleFilter(loadStats, lastMonthParams, appIds, setDateFrom, setDateTo)
          break
        default:
          break
      }
      setIsActive(filterType)
    }
  }

  return (
    <>
      <Grid className="is-vcentered">
        <GridItem className="is-narrow">
          <h6 className="title is-6">Filter by: </h6>
        </GridItem>
        <GridItem className="is-narrow">
          <ButtonGroup className="are-small">
            <Button
              type="button"
              className={`${isActive === FilterType.YESTERDAY && 'is-info'}`}
              variant="secondary"
              onClick={onFilterButtonClick(FilterType.YESTERDAY)}
              fullWidth={false}
            >
              Yesterday
            </Button>
            <Button
              type="button"
              className={`${isActive === FilterType.LAST_WEEK && 'is-info'}`}
              variant="secondary"
              onClick={onFilterButtonClick(FilterType.LAST_WEEK)}
              fullWidth={false}
            >
              Last Week
            </Button>
            <Button
              type="button"
              className={`${isActive === FilterType.LAST_MONTH && 'is-info'}`}
              variant="secondary"
              onClick={onFilterButtonClick(FilterType.LAST_MONTH)}
              fullWidth={false}
            >
              Last Month
            </Button>
          </ButtonGroup>
        </GridItem>
      </Grid>
    </>
  )
}

export default DefaultFilterGroup
