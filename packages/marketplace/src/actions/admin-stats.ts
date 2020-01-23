import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { Area, Range } from '@/components/pages/admin-stats'
import { AppSummaryModel, DeveloperModel, InstallationModel } from '@reapit/foundations-ts-definitions'

export type AdminStatsRequestParams = {
  area: Area
  range: Range
}

export type StatsFactor = AppSummaryModel | DeveloperModel | InstallationModel

export type AdminStatsReceiveParams = {
  data: StatsFactor[]
  totalCount: number
}

export const adminStatsRequestData = actionCreator<AdminStatsRequestParams>(ActionTypes.ADMIN_STATS_REQUEST_DATA)
export const adminStatsReceiveData = actionCreator<AdminStatsReceiveParams>(ActionTypes.ADMIN_STATS_RECEIVE_DATA)
export const adminStatsRequestFailure = actionCreator<void>(ActionTypes.ADMIN_STATS_REQUEST_DATA_FAILURE)
