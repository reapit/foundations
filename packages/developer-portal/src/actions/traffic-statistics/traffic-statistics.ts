import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'

const { FETCH_TRAFFIC_STATISTICS, FETCH_TRAFFIC_STATISTICS_SUCCESS, FETCH_TRAFFIC_STATISTICS_FAILED } = ActionTypes

export interface HttpTrafficPerDayParams {
  applicationId?: string[]
  customerId?: string[]
  dateFrom?: string
  dateTo?: string
}

export const fetchTrafficStatistics = actionCreator<HttpTrafficPerDayParams>(FETCH_TRAFFIC_STATISTICS)
export const fetchTrafficStatisticsSuccess = actionCreator<HttpTrafficPerDayParams>(FETCH_TRAFFIC_STATISTICS_SUCCESS)
export const fetchTrafficStatisticsFailed = actionCreator<void>(FETCH_TRAFFIC_STATISTICS_FAILED)
