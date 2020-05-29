import { ReduxState } from '@/types/core'
import { TopicModel, WebhookModel } from '@/reducers/webhook-subscriptions'

export const selectSubscriptionsData = (state: ReduxState): WebhookModel[] => {
  return state?.webhooks?.subscriptions?.subscriptions?._embedded || []
}

export const selectSubscriptionsLoading = (state: ReduxState): boolean => {
  return state?.webhooks?.subscriptions?.loading
}

export const selectTopicsData = (state: ReduxState): TopicModel[] => {
  return state?.webhooks?.topics?.topics?._embedded || []
}

export const selectTopicsLoading = (state: ReduxState): boolean => {
  return state?.webhooks?.topics?.loading
}

export const selectApplicationId = (state: ReduxState): string => {
  return state?.webhooks?.topics?.applicationId
}

export const selectWebhookEditModalType = (state: ReduxState): string => {
  return state.webhookEdit.modalType
}
