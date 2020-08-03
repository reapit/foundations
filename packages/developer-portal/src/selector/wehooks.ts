import { ReduxState } from '@/types/core'
import { WebhookModel } from '@/reducers/webhook-subscriptions'

export const selectSubscriptionsData = (state: ReduxState): WebhookModel[] => {
  return state?.webhooks?.subscriptions?.subscriptions?._embedded || []
}

export const selectSubscriptionsLoading = (state: ReduxState): boolean => {
  return state?.webhooks?.subscriptions?.loading
}

export const selectWebhookEditModalType = (state: ReduxState): string => {
  return state.webhookEdit.modalType
}
