import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  httpTrafficPerDayRequestData,
  httpTrafficPerDayReceiveData,
  httpTrafficPerDayRequestDataFailure,
} from '@/actions/app-http-traffic-event'

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

export interface AppHttpTrafficEventState {
  perDayLoading: boolean
  trafficEvents: TrafficEventsModel | null
}

export const defaultState: AppHttpTrafficEventState = {
  perDayLoading: false,
  trafficEvents: null,
}

const appHttpTrafficEventReducer = (
  state: AppHttpTrafficEventState = defaultState,
  action: Action<any>,
): AppHttpTrafficEventState => {
  if (isType(action, httpTrafficPerDayRequestData)) {
    return { ...state, perDayLoading: true }
  }

  if (isType(action, httpTrafficPerDayReceiveData)) {
    return { ...state, perDayLoading: false, trafficEvents: action.data }
  }

  if (isType(action, httpTrafficPerDayRequestDataFailure)) {
    return { ...state, perDayLoading: false }
  }

  return state
}

export default appHttpTrafficEventReducer
