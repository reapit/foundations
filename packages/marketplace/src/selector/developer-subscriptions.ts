import { ReduxState } from '@/types/core'
import { PagedResultSubscriptionModel_ } from '@/services/developer-subscriptions'

export const selectCreateDeveloperSubscriptionLoading = (state: ReduxState) => {
  return state.developerSubscriptions.create.loading
}

export const selectCreatedDeveloperSubscription = (state: ReduxState) => {
  return state.developerSubscriptions.create?.subscription
}

export const selectSubscriptions = (state: ReduxState): PagedResultSubscriptionModel_ => {
  return state.developerSubscriptions?.list?.data || ({} as PagedResultSubscriptionModel_)
}

export const selectSubscriptionsLoading = (state: ReduxState): boolean => {
  return state.developerSubscriptions?.list?.loading
}
