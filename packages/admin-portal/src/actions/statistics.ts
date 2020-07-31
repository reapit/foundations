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

/*
 * TODOME(statistics)
 * swaagger
 * action + entity
 * failure -> failed
 */

export const statisticsRequestData = actionCreator<StatisticsRequestParams>(ActionTypes.STATISTICS_REQUEST_DATA)
export const statisticsReceiveData = actionCreator<StatisticsReceiveParams>(ActionTypes.STATISTICS_RECEIVE_DATA)
export const statisticsRequestFailure = actionCreator<void>(ActionTypes.STATISTICS_REQUEST_DATA_FAILURE)
