import subscriptionsListReducer, { SubscriptionListState, defaultState as subscriptionListState } from './list'
import { combineReducers } from 'redux'

export type SubscriptionsState = {
  list: SubscriptionListState
}

export const defaultState: SubscriptionsState = {
  list: subscriptionListState,
}

export default combineReducers<SubscriptionsState>({
  list: subscriptionsListReducer,
})
