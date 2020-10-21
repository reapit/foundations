import { ReduxState } from '@/types/core'
import { SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'

export const selectCreateDeveloperSubscriptionLoading = (state: ReduxState): boolean => {
  return state.developerSubscriptions.create.isLoading
}

export const selectCreateDeveloperSubscriptionError = (state: ReduxState): boolean => {
  return state.developerSubscriptions.create.error
}

export const selectSubscriptions = (state: ReduxState): SubscriptionModelPagedResult => {
  return state.developerSubscriptions?.list?.data || ({} as SubscriptionModelPagedResult)
}

export const selectSubscriptionsLoading = (state: ReduxState): boolean => {
  return state.developerSubscriptions?.list?.isLoading
}
