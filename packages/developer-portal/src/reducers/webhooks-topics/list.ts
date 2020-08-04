import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { fetchWebhooksTopics, fetchWebhooksTopicsFailed, fetchWebhooksTopicsSuccess } from '@/actions/webhooks-topics'
import { PagedResultTopicModel_ } from '@/services/webhooks'

export type WebhooksTopicsListState = PagedResultTopicModel_ & {
  isLoading: boolean
  errorMessage: string
}

export const defaultWebhooksTopicsState = {
  isLoading: false,
  errorMessage: '',
  pageNumber: 1,
  pageSize: 0,
  pageCount: 0,
  totalCount: 0,
}

export const webhooksTopicsReducer = (
  state: WebhooksTopicsListState = defaultWebhooksTopicsState,
  action: Action<any>,
): WebhooksTopicsListState => {
  if (isType(action, fetchWebhooksTopics)) {
    return {
      ...state,
      isLoading: true,
      errorMessage: '',
    }
  }

  if (isType(action, fetchWebhooksTopicsSuccess)) {
    return {
      ...state,
      ...action.data,
      isLoading: false,
      errorMessage: '',
    }
  }
  if (isType(action, fetchWebhooksTopicsFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  return state
}
