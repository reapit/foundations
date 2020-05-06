import { ReduxState } from '@/types/core'

export const selectTopics = (state: ReduxState) => {
  return state.webhookEdit?.subcriptionTopics?._embedded || []
}
export const selectCustomers = (state: ReduxState) => {
  return state.webhookEdit?.subcriptionCustomers?.data || []
}

export const selectLoading = (state: ReduxState) => {
  return state.webhookEdit?.loading
}

export const selectWebhookData = (state: ReduxState) => {
  return state.webhookEdit?.webhookData
}
