import { ReduxState } from '@/types/core'

export const selectTopics = (state: ReduxState) => {
  return state.webhooksSubscriptions?.edit?.subcriptionTopics?._embedded || []
}
export const selectCustomers = (state: ReduxState) => {
  return state.webhooksSubscriptions?.edit?.subcriptionCustomers?.data || []
}

export const selectLoading = (state: ReduxState) => {
  return state.webhooksSubscriptions?.edit?.loading
}

export const selectWebhookData = (state: ReduxState) => {
  return state.webhooksSubscriptions?.edit?.webhookData
}

export const selectWebhookTopicsSubcription = (state: ReduxState) => {
  return state.webhooksSubscriptions?.edit?.webhookData?.topicIds
}

export const selectWebhookEditModalType = (state: ReduxState): string => {
  return state.webhooksSubscriptions?.edit.modalType
}
