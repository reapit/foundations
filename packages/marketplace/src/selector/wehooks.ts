import { ReduxState } from '@/types/core'

export const selectSubscriptionsData = (state: ReduxState) => {
  return state?.webhooks?.subscriptions?.subscriptions?._embedded || []
}

export const selectSubscriptionsLoading = (state: ReduxState) => {
  return state?.webhooks?.subscriptions?.loading
}

export const selectTopicsData = (state: ReduxState) => {
  return state?.webhooks?.topics?.topics?._embedded || []
}

export const selectTopicsLoading = (state: ReduxState) => {
  return state?.webhooks?.topics?.loading
}

export const selectApplicationId = (state: ReduxState) => {
  return state?.webhooks?.topics?.applicationId
}
