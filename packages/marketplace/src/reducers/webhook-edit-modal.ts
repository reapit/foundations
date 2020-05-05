import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  requestWebhookSubcriptionReceiveData,
  requestWebhookSubcriptionReceiveFailure,
  webhookEditLoading,
  requestWebhookReceiveData,
  webhookDataClear,
  webhookSetOpenModal,
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

export interface CustomerItem {
  id: string
  appId: string
  created: string
  client: string
  status: string
  authFlow: string
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

export interface SubcriptionCustomers {
  data: CustomerItem[]
  pageNumber: number
  pageSize: number
  pageCount: number
  totalCount: number
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
  subcriptionCustomers: SubcriptionCustomers
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
  if (isType(action, webhookDataClear)) {
    return defaultState
  }
  if (isType(action, webhookSetOpenModal)) {
    return {
      ...state,
      modalType: action.data,
    }
  }
  return state
}

export default WebhookEditReducer
