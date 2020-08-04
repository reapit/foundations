import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { FetchWebhooksSubscriptionsListParams, PagedResultWebhookModel_ } from '@/services/webhooks'

export const fetchWebhooksSubscriptions = actionCreator<FetchWebhooksSubscriptionsListParams>(
  ActionTypes.FETCH_WEBHOOKS_SUBSCRIPTIONS,
)
export const fetchWebhooksSubscriptionsSuccess = actionCreator<PagedResultWebhookModel_>(
  ActionTypes.FETCH_WEBHOOKS_SUBSCRIPTIONS_SUCCESS,
)
export const fetchWebhooksSubscriptionsFailed = actionCreator<string>(ActionTypes.FETCH_WEBHOOKS_SUBSCRIPTIONS_FAILED)

export const setApplicationId = actionCreator<string>(ActionTypes.WEBHOOK_SET_APPLICATION_ID)
