import { ReduxState } from '@/types/core'
import { PagedResultSubscriptionModel_ } from '@reapit/foundations-ts-definitions'

export const selectCreateDeveloperSubscriptionLoading = (state: ReduxState): boolean => {
  return state.developerSubscriptions.create.loading
}

export const selectCreateDeveloperSubscriptionError = (state: ReduxState): boolean => {
  return state.developerSubscriptions.create.error
}

export const selectSubscriptions = (state: ReduxState): PagedResultSubscriptionModel_ => {
  return state.developerSubscriptions?.list?.data || ({} as PagedResultSubscriptionModel_)
}

export const selectSubscriptionsLoading = (state: ReduxState): boolean => {
  return state.developerSubscriptions?.list?.loading
}
