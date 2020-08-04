import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  fetchWebhooksSubscriptions,
  fetchWebhooksSubscriptionsFailed,
  fetchWebhooksSubscriptionsSuccess,
} from '@/actions/webhooks-subscriptions'
import { PagedResultTopicModel_ } from '@/services/webhooks'

export type WebhooksSubscriptionsListState = PagedResultTopicModel_ & {
  isLoading: boolean
  errorMessage: string
}

export const defaultWebhooksSubscriptionsState = {
  isLoading: false,
  errorMessage: '',
  pageNumber: 1,
  pageSize: 0,
  pageCount: 0,
  totalCount: 0,
}

export const webhooksSubscriptionsReducer = (
  state: WebhooksSubscriptionsListState = defaultWebhooksSubscriptionsState,
  action: Action<any>,
): WebhooksSubscriptionsListState => {
  if (isType(action, fetchWebhooksSubscriptions)) {
    return {
      ...state,
      isLoading: true,
      errorMessage: '',
    }
  }

  if (isType(action, fetchWebhooksSubscriptionsSuccess)) {
    return {
      ...state,
      ...action.data,
      isLoading: false,
      errorMessage: '',
    }
  }
  if (isType(action, fetchWebhooksSubscriptionsFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  return state
}
