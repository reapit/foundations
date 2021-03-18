import { SubscriptionModel } from '@reapit/foundations-ts-definitions'
import { ReduxState } from '../types/core'

export const selectSubsByAppId = (appId?: string) => (state: ReduxState): SubscriptionModel[] => {
  const subscriptionsDefault: SubscriptionModel[] = []
  if (!appId) return subscriptionsDefault
  return (
    state.subscriptions.byDevAndType.subscriptions.filter((sub) => sub.applicationId === appId) ?? subscriptionsDefault
  )
}

export const selectSubsByDeveloperId = (developerId: string) => (state: ReduxState): SubscriptionModel[] => {
  const subscriptionsDefault: SubscriptionModel[] = []
  return (
    state.subscriptions.byDevAndType.subscriptions.filter((sub) => sub.developerId === developerId) ??
    subscriptionsDefault
  )
}

export const selectCreateSubscriptionLoading = (state: ReduxState): boolean => {
  return state.subscriptions.list.createSubscription.isLoading
}

export const selectCancelSubscriptionLoading = (state: ReduxState): boolean => {
  return state.subscriptions.list.cancelSubscription.isLoading
}
