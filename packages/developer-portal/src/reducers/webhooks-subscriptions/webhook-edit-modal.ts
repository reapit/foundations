import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  requestWebhookSubcriptionReceiveData,
  requestWebhookSubcriptionReceiveFailure,
  requestWebhookReceiveData,
  webhookDataClear,
  webhookSetOpenModal,
  requestWebhookSubcriptionData,
  requestWebhookData,
} from '@/actions/webhooks-subscriptions'
import { InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'

export interface WebhookModal {
  id: string
  applicationId: string
  url: string
  description: string
  topicIds: string[]
  customerIds: string[]
  ignoreEtagOnlyChanges: boolean
  active: boolean
}

export interface TopicItem {
  id: string
  created: string
  modified?: boolean
  name: string
  description: string
  url: string
  active: boolean
  example: string
  associatedScope: string
}

export interface SubcriptionTopics {
  _embedded: TopicItem[]
  pageNumber: number
  pageSize: number
  pageCount: number
  totalCount: number
  _links?: []
}

export interface WebhookSubscription {
  subcriptionCustomers: InstallationModelPagedResult
  subcriptionTopics: SubcriptionTopics
}

export type WebhookEditState = WebhookSubscription & {
  loading: boolean
  modalType: string
  webhookData: WebhookModal
}

export const defaultState: WebhookEditState = {
  loading: false,
  modalType: '',
  subcriptionCustomers: {
    data: [],
    pageNumber: 0,
    pageSize: 0,
    pageCount: 0,
    totalCount: 0,
  },
  subcriptionTopics: {
    _embedded: [],
    pageNumber: 0,
    pageSize: 0,
    pageCount: 0,
    totalCount: 0,
  },
  webhookData: {
    id: '',
    applicationId: '',
    url: '',
    description: '',
    topicIds: [],
    customerIds: [],
    ignoreEtagOnlyChanges: true,
    active: false,
  },
}

export const webhookEditReducer = (state: WebhookEditState = defaultState, action: Action<any>): WebhookEditState => {
  if (isType(action, requestWebhookSubcriptionData) || isType(action, requestWebhookData)) {
    return {
      ...state,
      loading: true,
    }
  }
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
  if (isType(action, requestWebhookReceiveData)) {
    return {
      ...state,
      webhookData: action.data as any,
    }
  }
  if (isType(action, webhookDataClear)) {
    return defaultState
  }
  if (isType(action, webhookSetOpenModal)) {
    return {
      ...state,
      modalType: action.data as any,
    }
  }
  return state
}
