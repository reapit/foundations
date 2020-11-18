import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'
import { CancelSubscriptionParams } from '../services/subscriptions'

export interface FetchSubscriptionListQuery {
  page: number
  queryString: string
}

export type CancelSubscriptionActionParams = CancelSubscriptionParams & { callback: (isSuccess: boolean) => void }

export const fetchSubscriptionList = actionCreator<FetchSubscriptionListQuery>(ActionTypes.FETCH_SUBSCRIPTION_LIST)

export const fetchSubscriptionListSuccess = actionCreator<SubscriptionModelPagedResult | undefined>(
  ActionTypes.FETCH_SUBSCRIPTION_LIST_SUCCESS,
)

export const fetchSubscriptionListFailed = actionCreator<string>(ActionTypes.FETCH_SUBSCRIPTION_LIST_FAILED)

export const cancelSubscription = actionCreator<CancelSubscriptionParams>(ActionTypes.CANCEL_SUBSCRIPTION)
