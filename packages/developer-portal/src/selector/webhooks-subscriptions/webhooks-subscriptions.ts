import { WebhookModel } from '@/services/webhooks'
import { ReduxState } from '@/types/core'

export const selectSubscriptionsData = (state: ReduxState): WebhookModel[] => {
  return state?.webhooksSubscriptions?.list?._embedded || []
}

export const selectSubscriptionsLoading = (state: ReduxState): boolean => {
  return state?.webhooksSubscriptions?.list?.isLoading
}
