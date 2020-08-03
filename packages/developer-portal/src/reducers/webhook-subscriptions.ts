import { combineReducers } from 'redux'
import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { webhookSubscriptionsRequestData, webhookSubscriptionsReceiveData } from '@/actions/webhook-subscriptions'

export interface WebhookModel {
  id: string
  created: string
  modified: string
  applicationId: string
  url: string
  topicIds: string[]
  customerIds: string[]
  active: boolean
  deleted: boolean
}
/**
 * Model to handle paged data and information
 */
export interface PagedResultWebhookModel_ {
  /**
   * List of paged data
   */
  _embedded?: WebhookModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
}

export interface WebhookSubscriptionsState {
  loading: boolean
  error: boolean
  subscriptions: PagedResultWebhookModel_
}

export interface WebhookState {
  subscriptions: WebhookSubscriptionsState
}

export const defaultState: WebhookState = {
  subscriptions: {
    loading: false,
    error: false,
    subscriptions: {
      _embedded: [],
    },
  },
}

export const webhookSubscriptionsReducer = (
  state: WebhookSubscriptionsState = defaultState.subscriptions,
  action: Action<any>,
): WebhookSubscriptionsState => {
  if (isType(action, webhookSubscriptionsRequestData)) {
    return {
      ...state,
      loading: true,
      error: false,
    }
  }

  if (isType(action, webhookSubscriptionsReceiveData)) {
    return {
      ...state,
      loading: false,
      error: false,
      subscriptions: action.data,
    }
  }

  return state
}

export default combineReducers<WebhookState>({
  subscriptions: webhookSubscriptionsReducer,
})
