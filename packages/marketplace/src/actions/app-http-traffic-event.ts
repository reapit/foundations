import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

const {
  HTTP_TRAFFIC_PER_DAY_REQUEST_DATA,
  HTTP_TRAFFIC_PER_DAY_RECEIVE_DATA,
  HTTP_TRAFFIC_PER_DAY_REQUEST_FAILURE,
} = ActionTypes

export interface HttpTrafficPerDayParams {
  applicationId: string
  params: {
    customerId?: string
    endpointVersion?: string
    dateFrom?: string
    dateTo?: string
  }
}

export const httpTrafficPerDayRequestData = actionCreator<HttpTrafficPerDayParams>(HTTP_TRAFFIC_PER_DAY_REQUEST_DATA)
export const httpTrafficPerDayReceiveData = actionCreator<HttpTrafficPerDayParams>(HTTP_TRAFFIC_PER_DAY_RECEIVE_DATA)
export const httpTrafficPerDayRequestDataFailure = actionCreator<void>(HTTP_TRAFFIC_PER_DAY_REQUEST_FAILURE)
