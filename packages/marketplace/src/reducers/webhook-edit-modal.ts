import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  requestWebhookSubcriptionReceiveData,
  requestWebhookSubcriptionReceiveFailure,
  webhookEditLoading,
  requestWebhookReceiveData,
} from '../actions/webhook-edit-modal'

export interface WebhookModal {
  id: string
  applicationId: string
  url: string
  description: string
  topicIds: string[]
  customerIds: string[]
  active: boolean
}

export interface WebhookEditState {
  loading?: boolean
  subcriptionCustomers: any
  subcriptionTopics: any
  webhookData?: WebhookModal
}

export const defaultState: WebhookEditState = {
  loading: false,
  subcriptionCustomers: {},
  subcriptionTopics: {},
  webhookData: {
    id: '',
    applicationId: '',
    url: '',
    description: '',
    topicIds: [],
    customerIds: [],
    active: false,
  },
}

const WebhookEditReducer = (state: WebhookEditState = defaultState, action: Action<any>): WebhookEditState => {
  if (isType(action, requestWebhookSubcriptionReceiveData)) {
    return {
      ...state,
      loading: false,
      ...action.data,
    }
  }
  if (isType(action, requestWebhookSubcriptionReceiveFailure)) {
    return {
      ...state,
      loading: false,
    }
  }
  if (isType(action, webhookEditLoading)) {
    return {
      ...state,
      loading: action.data,
    }
  }
  if (isType(action, requestWebhookReceiveData)) {
    return {
      ...state,
      webhookData: action.data,
    }
  }
  return state
}

export default WebhookEditReducer
