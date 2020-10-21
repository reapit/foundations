import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { FetchSubscriptionsListParams } from '@/services/developer-subscriptions'
import {
  SubscriptionModel,
  CreateSubscriptionModel,
  SubscriptionModelPagedResult,
} from '@reapit/foundations-ts-definitions'

export const developerFetchSubscriptions = actionCreator<FetchSubscriptionsListParams>(
  ActionTypes.DEVELOPER_FETCH_SUBSCRIPTIONS,
)
export const developerFetchSubscriptionsSuccess = actionCreator<SubscriptionModelPagedResult>(
  ActionTypes.DEVELOPER_FETCH_SUBSCRIPTIONS_SUCCESS,
)
export const developerDeleteSubscription = actionCreator<string>(ActionTypes.DEVELOPER_DELETE_SUBSCRIPTION)

export interface CreateSubscriptionParams {
  params: CreateSubscriptionModel
  onCreated: () => void
}

export const developerCreateSubscription = actionCreator<CreateSubscriptionParams>(
  ActionTypes.DEVELOPER_SUBSCRIPTION_CREATE,
)
export const developerCreateSubscriptionSuccess = actionCreator<SubscriptionModel>(
  ActionTypes.DEVELOPER_SUBSCRIPTION_CREATE_SUCCESS,
)
export const developerCreateSubscriptionFalure = actionCreator<void>(ActionTypes.DEVELOPER_SUBSCRIPTION_CREATE_FAILURE)
export const developerCreateSubscriptionClearError = actionCreator<void>(
  ActionTypes.DEVELOPER_SUBSCRIPTION_CLEAR_CREATE_ERROR,
)
