import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'

export interface fetchSubscriptionListValues {
  page: number
  queryString: string
}

export const fetchSubscriptionList = actionCreator<fetchSubscriptionListValues>(ActionTypes.FETCH_SUBCRIPTION_LIST)
export const fetchSubscriptionListFailed = actionCreator<string>(ActionTypes.FETCH_SUBCRIPTION_LIST_FAILED)
export const fetchSubscriptionListSuccess = actionCreator<SubscriptionModelPagedResult | undefined>(
  ActionTypes.FETCH_SUBCRIPTION_LIST_SUCCESS,
)
