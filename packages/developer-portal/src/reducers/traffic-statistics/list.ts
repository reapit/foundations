import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  fetchTrafficStatistics,
  fetchTrafficStatisticsSuccess,
  fetchTrafficStatisticsFailed,
} from '@/actions/traffic-statistics'

export interface RequestByEndpointModel {
  endpoint: string
  requestCount: number
}

export interface RequestByDateModel {
  date: string
  requestCount: number
}

export interface RequestByCustomerModel {
  customerId: string
  requestCount: number
}
export interface TrafficEventsModel {
  from?: string
  to?: string
  totalRequestCount?: number
  totalEndpointCount?: number
  requestsByEndpoint?: RequestByEndpointModel[]
  requestsByDate?: RequestByDateModel[]
  requestsByCustomer?: RequestByCustomerModel[]
  applicationId?: string[]
  customerId?: string[]
  dateFrom?: string
  dateTo?: string
}

export interface TrafficStatisticsState {
  isLoading: boolean
  data: TrafficEventsModel | null
}

export const defaultState: TrafficStatisticsState = {
  isLoading: false,
  data: null,
}

const trafficStatisticsReducer = (
  state: TrafficStatisticsState = defaultState,
  action: Action<any>,
): TrafficStatisticsState => {
  if (isType(action, fetchTrafficStatistics)) {
    return { ...state, isLoading: true }
  }

  if (isType(action, fetchTrafficStatisticsSuccess)) {
    return { ...state, isLoading: false, data: action.data }
  }

  if (isType(action, fetchTrafficStatisticsFailed)) {
    return { ...state, isLoading: false }
  }

  return state
}

export default trafficStatisticsReducer
