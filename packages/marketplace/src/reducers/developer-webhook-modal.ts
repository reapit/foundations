import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  requestDeveloperWebhookReceiveData,
  developerWebhookLoading,
  developerWebhookRequestDataFailure,
} from '../actions/developer-webhook-modal'

export interface DeveloperWebhookSubscriptionCustomersRequest {
  appId: number
}
export interface DeveloperWebhookSubscriptionTopicsRequest {
  appId: number
}

export interface DeveloperWebhookDataRequest {
  appId: number
}

export interface DeveloperWebhookState {
  loading?: boolean
  subcriptionCustomers: any
  subcriptionTopics: any
}

export const defaultState: DeveloperWebhookState = {
  loading: false,
  subcriptionCustomers: {},
  subcriptionTopics: {},
}

const DeveloperWebhookReducer = (
  state: DeveloperWebhookState = defaultState,
  action: Action<any>,
): DeveloperWebhookState => {
  if (isType(action, requestDeveloperWebhookReceiveData)) {
    return {
      ...state,
      loading: false,
      ...action.data,
    }
  }
  if (isType(action, developerWebhookRequestDataFailure)) {
    return {
      ...state,
      loading: false,
    }
  }
  if (isType(action, developerWebhookLoading)) {
    return {
      ...state,
      loading: action.data,
    }
  }
  return state
}

export default DeveloperWebhookReducer
