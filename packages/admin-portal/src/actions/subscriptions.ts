import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { SubscriptionModelPagedResult, CreateSubscriptionModel } from '@reapit/foundations-ts-definitions'
import { CancelSubscriptionParams } from '../services/subscriptions'
import { SubscriptionType } from '../components/subscriptions/create-subscriptions'

export interface FetchSubscriptionListQuery {
  page: number
  queryString: string
}

export interface FetchSubscriptionsByTypeAndDevQuery {
  subscriptionType: SubscriptionType
  developerId: string
  appId?: string
}

export type CancelSubscriptionActionParams = CancelSubscriptionParams

export const fetchSubscriptionList = actionCreator<FetchSubscriptionListQuery>(ActionTypes.FETCH_SUBSCRIPTION_LIST)

export const fetchSubscriptionListSuccess = actionCreator<SubscriptionModelPagedResult | undefined>(
  ActionTypes.FETCH_SUBSCRIPTION_LIST_SUCCESS,
)

export const fetchSubscriptionListFailed = actionCreator<string>(ActionTypes.FETCH_SUBSCRIPTION_LIST_FAILED)

export const cancelSubscription = actionCreator<CancelSubscriptionParams>(ActionTypes.CANCEL_SUBSCRIPTION)

export const cancelSubscriptionSuccess = actionCreator<void>(ActionTypes.CANCEL_SUBSCRIPTION_SUCCESS)

export const cancelSubscriptionFailed = actionCreator<void>(ActionTypes.CANCEL_SUBSCRIPTION_FAILED)

export const createSubscription = actionCreator<CreateSubscriptionModel>(ActionTypes.CREATE_SUBSCRIPTION)

export const createSubscriptionSuccess = actionCreator<void>(ActionTypes.CREATE_SUBSCRIPTION_SUCCESS)

export const createSubscriptionFailed = actionCreator<void>(ActionTypes.CREATE_SUBSCRIPTION_FAILED)

export const fetchSubscriptionsByTypeAndDev = actionCreator<FetchSubscriptionsByTypeAndDevQuery>(
  ActionTypes.FETCH_SUBSCRIPTIONS_BY_TYPE_AND_DEV,
)

export const fetchSubscriptionsByTypeAndDevSuccess = actionCreator<SubscriptionModelPagedResult | undefined>(
  ActionTypes.FETCH_SUBSCRIPTIONS_BY_TYPE_AND_DEV_SUCCESS,
)
