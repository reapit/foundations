import * as React from 'react'
import { Dispatch } from 'redux'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { Button, ButtonGroup, Grid, GridItem, DATE_TIME_FORMAT } from '@reapit/elements'
import { appUsageStatsRequestData } from '@/actions/app-usage-stats'
import { appInstallationsRequestData } from '@/actions/app-installations'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'

type DefaultFilterGroupProps = {
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
  appIds: string[],
  clientIds: string[],
  setDateFrom: (date: string) => void,
  setDateTo: (date: string) => void,
  dispatch: Dispatch,
) => {
  setDateFrom(dateParams.dateFrom)
  setDateTo(dateParams.dateTo)
  dispatch(
    appUsageStatsRequestData({
      ...dateParams,
      appId: appIds,
    }),
  )
  dispatch(
    appInstallationsRequestData({
      appId: appIds,
      clientId: clientIds,
      pageSize: GET_ALL_PAGE_SIZE,
      installedDateFrom: dateParams.dateFrom,
      installedDateTo: dateParams.dateTo,
    }),
  )
}

const DefaultFilterGroup: React.FC<DefaultFilterGroupProps> = ({ appIds, clientIds, setDateFrom, setDateTo }) => {
  const [isActive, setIsActive] = React.useState(FilterType.LAST_WEEK)
  const dispatch = useDispatch()

  const onFilterButtonClick = filterType => {
    return () => {
      const { yesterdayParams, lastWeekParams, lastMonthParams } = prepareDefaultFilterDateParams()
      switch (filterType) {
        case FilterType.YESTERDAY:
          handleFilter(yesterdayParams, appIds, clientIds, setDateFrom, setDateTo, dispatch)
          break
        case FilterType.LAST_WEEK:
          handleFilter(lastWeekParams, appIds, clientIds, setDateFrom, setDateTo, dispatch)
          break
        case FilterType.LAST_MONTH:
          handleFilter(lastMonthParams, appIds, clientIds, setDateFrom, setDateTo, dispatch)
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
