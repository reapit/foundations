import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { WebhookModal, WebhookSubscription } from '@/reducers/webhook-edit-modal'

export interface SubscriptionCustomersRequestParams {
  AppId: string
}
export interface SubscriptionTopicsRequestParams {
  applicationId: string
}

export interface FetchWebhookRequestParams {
  webhookId: string
}

export interface DeleteWebhookRequestParams {
  webhookId: string
}

export interface WebhookDataRequestParams {
  webhookId: string
}

export interface WebhookSubcriptionDataRequest {
  appId: string
}

export interface DeleteWebhookParams {
  applicationId: string
  webhookId: string
}
export interface CreateWebhookParams {
  applicationId: string
  url: string
  description?: string
  topicIds: string[]
  customerIds: string[]
  active: boolean
}

export interface EditWebhookParams {
  applicationId: string
  webhookId: string
  url: string
  description?: string
  topicIds: string[]
  customerIds: string[]
  active: boolean
}

export const requestWebhookSubcriptionData = actionCreator<string>(ActionTypes.WEBHOOK_EDIT_SUBCRIPTION_REQUEST_DATA)
export const requestWebhookSubcriptionReceiveData = actionCreator<WebhookSubscription>(
  ActionTypes.WEBHOOK_EDIT_SUBCRIPTION_RECEIVE_DATA,
)
export const requestWebhookSubcriptionReceiveFailure = actionCreator<void>(
  ActionTypes.WEBHOOK_EDIT_SUBCRIPTION_REQUEST_DATA_FAILURE,
)
export const createWebhook = actionCreator<CreateWebhookParams>(ActionTypes.WEBHOOK_CREATE)
export const editWebhook = actionCreator<EditWebhookParams>(ActionTypes.WEBHOOK_EDIT)
export const deleteWebhook = actionCreator<DeleteWebhookParams>(ActionTypes.WEBHOOK_DELETE)
export const requestWebhookData = actionCreator<string>(ActionTypes.WEBHOOK_REQUEST_DATA)
export const requestWebhookReceiveData = actionCreator<WebhookModal>(ActionTypes.WEBHOOK_RECEIVE_DATA)
export const requestWebhookReceiveDataFailure = actionCreator<void>(ActionTypes.WEBHOOK_RECEIVE_DATA_FAILURE)
export const webhookDataClear = actionCreator<void>(ActionTypes.WEBHOOK_DATA_CLEAR)
export const webhookSetOpenModal = actionCreator<string>(ActionTypes.WEBHOOK_SET_OPEN_MODAL)
