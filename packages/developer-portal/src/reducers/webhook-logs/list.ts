import { Action } from '../../types/core'
import { isType } from '../../utils/actions'
import {
  fetchWebhookLogs,
  fetchWebhookLogsError,
  fetchWebhookLogsSuccess,
} from '../../actions/webhook-logs/webhook-logs'
import { TopicModel, WebhookLogModel } from '../../services/webhooks'

export type WebhookLogsListState = {
  isLoading: boolean
  errorMessage: string
  logs: WebhookLogModel[]
  topics: TopicModel[]
}

export const defaultWebhooksLogsState = {
  isLoading: false,
  errorMessage: '',
  logs: [],
  topics: [],
}

export const webhookLogsReducer = (
  state: WebhookLogsListState = defaultWebhooksLogsState,
  action: Action<any>,
): WebhookLogsListState => {
  if (isType(action, fetchWebhookLogs)) {
    return {
      ...state,
      isLoading: true,
      errorMessage: '',
    }
  }

  if (isType(action, fetchWebhookLogsSuccess)) {
    return {
      ...state,
      ...action.data,
      isLoading: false,
      errorMessage: '',
    }
  }

  if (isType(action, fetchWebhookLogsError)) {
    return {
      ...state,
      logs: [],
      isLoading: false,
      errorMessage: action.data,
    }
  }

  return state
}
