import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

const { APP_USAGE_STATS_REQUEST_DATA, APP_USAGE_STATS_RECEIVE_DATA, APP_USAGE_STATS_REQUEST_DATA_FAILURE } = ActionTypes

export interface AppUsageStatsParams {
  id?: string[]
  dateFrom?: string
  dateTo?: string
}

export const appUsageStatsRequestData = actionCreator<AppUsageStatsParams>(APP_USAGE_STATS_REQUEST_DATA)
export const appUsageStatsReceiveData = actionCreator<AppUsageStatsParams>(APP_USAGE_STATS_RECEIVE_DATA)
export const appUsageStatsRequestDataFailure = actionCreator<void>(APP_USAGE_STATS_REQUEST_DATA_FAILURE)
