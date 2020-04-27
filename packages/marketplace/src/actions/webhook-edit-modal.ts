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

export interface CreateDeveloperWebhookParams {
  ApplicationId: string
  url: string
  description?: string
  topicIds: string[]
  customerIds: string[]
  active: boolean
}
export const developerWebhookLoading = actionCreator<boolean>(ActionTypes.DEVELOPER_WEBHOOK_LOADING)
export const requestDeveloperWebhookData = actionCreator<string>(ActionTypes.DEVELOPER_WEBHOOK_REQUEST_DATA)
export const requestDeveloperWebhookReceiveData = actionCreator<DeveloperWebhookState>(
  ActionTypes.DEVELOPER_WEBHOOK_RECEIVE_DATA,
)
export const createDeveloperWebhook = actionCreator<CreateDeveloperWebhookParams>(ActionTypes.DEVELOPER_WEBHOOK_CREATE)
export const developerWebhookRequestDataFailure = actionCreator<void>(
  ActionTypes.DEVELOPER_WEBHOOK_REQUEST_DATA_FAILURE,
)
