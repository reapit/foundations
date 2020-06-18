import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import {
  CreateSubscriptionModel,
  FetchSubscriptionsListParams,
  PagedResultSubscriptionModel_,
} from '@/services/developer-subscriptions'
import { SubscriptionModel } from '@/services/developer-subscriptions'

export const developerFetchSubscriptions = actionCreator<FetchSubscriptionsListParams>(
  ActionTypes.DEVELOPER_FETCH_SUBSCRIPTIONS,
)
export const developerFetchSubscriptionsSuccess = actionCreator<PagedResultSubscriptionModel_>(
  ActionTypes.DEVELOPER_FETCH_SUBSCRIPTIONS_SUCCESS,
)
export const developerDeleteSubscription = actionCreator<string>(ActionTypes.DEVELOPER_DELETE_SUBSCRIPTION)

export const developerCreateSubscription = actionCreator<CreateSubscriptionModel>(
  ActionTypes.DEVELOPER_SUBSCRIPTION_CREATE,
)
export const developerCreateSubscriptionSuccess = actionCreator<SubscriptionModel>(
  ActionTypes.DEVELOPER_SUBSCRIPTION_CREATE_SUCCESS,
)
export const developerCreateSubscriptionFalure = actionCreator<void>(ActionTypes.DEVELOPER_SUBSCRIPTION_CREATE_FAILURE)
