import { combineReducers } from 'redux'
import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  webhookSubscriptionsRequestData,
  webhookSubscriptionsReceiveData,
  webhookTopicsRequestData,
  webhookTopicsReceiveData,
  setApplicationId,
} from '@/actions/webhook-subscriptions'

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

export interface TopicModel {
  id: string
  created: string
  modified: string
  name: string
  description: string
  url: string
  active: boolean
  associatedScope: string
  example: string
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

/**
 * Model to handle paged data and information
 */
export interface PagedResultTopicModel_ {
  /**
   * List of paged data
   */
  _embedded?: TopicModel[]
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

export interface WebhookTopicsState {
  applicationId: string
  loading: boolean
  error: boolean
  topics: PagedResultTopicModel_
}

export interface WebhookState {
  subscriptions: WebhookSubscriptionsState
  topics: WebhookTopicsState
}

export const defaultState: WebhookState = {
  subscriptions: {
    loading: false,
    error: false,
    subscriptions: {
      _embedded: [],
    },
  },
  topics: {
    applicationId: '',
    loading: false,
    error: false,
    topics: {
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

export const webhookTopicsReducer = (
  state: WebhookTopicsState = defaultState.topics,
  action: Action<any>,
): WebhookTopicsState => {
  if (isType(action, webhookTopicsRequestData)) {
    return {
      ...state,
      loading: true,
      error: false,
    }
  }

  if (isType(action, webhookTopicsReceiveData)) {
    return {
      ...state,
      loading: false,
      error: false,
      topics: action.data,
    }
  }
  if (isType(action, setApplicationId)) {
    return {
      ...state,
      applicationId: action.data,
    }
  }

  return state
}

export default combineReducers<WebhookState>({
  subscriptions: webhookSubscriptionsReducer,
  topics: webhookTopicsReducer,
})
