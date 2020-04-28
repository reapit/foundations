import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { DeveloperWebhookState } from '@/reducers/webhook-edit-modal'
import { StringMap } from '../../../elements/src/types/core'

export interface SubscriptionCustomersRequestParams {
  AppId: string
}
export interface SubscriptionTopicsRequestParams {
  ApplicationId: string
  headers: StringMap
}

export interface CreateWebhookParams {
  ApplicationId: string
  url: string
  description?: string
  topicIds: string[]
  customerIds: string[]
  active: boolean
}
export interface WebhookDataRequestParams {
  webhookId: string
}

export interface WebhookSubcriptionDataRequest {
  appId: number
}

export const webhookEditLoading = actionCreator<boolean>(ActionTypes.WEBHOOK_EDIT_LOADING)
export const requestWebhookSubcriptionData = actionCreator<string>(ActionTypes.WEBHOOK_EDIT_SUBCRIPTION_REQUEST_DATA)
export const requestWebhookSubcriptionReceiveData = actionCreator<DeveloperWebhookState>(
  ActionTypes.WEBHOOK_EDIT_SUBCRIPTION_RECEIVE_DATA,
)
export const requestWebhookSubcriptionReceiveFailure = actionCreator<void>(
  ActionTypes.WEBHOOK_EDIT_SUBCRIPTION_REQUEST_DATA_FAILURE,
)
export const createWebhook = actionCreator<CreateWebhookParams>(ActionTypes.WEBHOOK_CREATE)
