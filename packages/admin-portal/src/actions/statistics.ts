import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { Area, Range } from '@/components/pages/statistics/statistics'
import { AppSummaryModel, DeveloperModel, InstallationModel } from '@reapit/foundations-ts-definitions'

export type StatisticsRequestParams = {
  area: Area
  range: Range
}

export type StatisticsFactor = AppSummaryModel | DeveloperModel | InstallationModel

export type StatisticsReceiveParams = {
  data: StatisticsFactor[]
  totalCount: number
}

export const fetchStatistics = actionCreator<StatisticsRequestParams>(ActionTypes.FETCH_STATISTICS)

export const fetchStatisticsSucces = actionCreator<StatisticsReceiveParams>(ActionTypes.FETCH_STATISTICS_SUCCES)

export const fetchStatisticsFailed = actionCreator<void>(ActionTypes.FETCH_STATISTICS_FAILED)
