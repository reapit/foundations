import { PagedResultWebhookModel_ } from '@/services/webhooks'
import { ReduxState } from '@/types/core'

export const selectSubscriptionsData = (state: ReduxState): PagedResultWebhookModel_ | null => {
  return state?.webhooksSubscriptions?.list || null
}

export const selectSubscriptionsLoading = (state: ReduxState): boolean => {
  return state?.webhooksSubscriptions?.list?.isLoading
}
