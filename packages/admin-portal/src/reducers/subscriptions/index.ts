import subscriptionsListReducer, { SubscriptionListState, defaultState as subscriptionListState } from './list'
import { combineReducers } from 'redux'
import subscriptionsByDevAndTypeReducer, {
  SubscriptionsByDevAndTypeState,
  defaultState as subscriptionsByDevAndTypeState,
} from './by-dev-and-type'

export type SubscriptionsState = {
  list: SubscriptionListState
  byDevAndType: SubscriptionsByDevAndTypeState
}

export const defaultState: SubscriptionsState = {
  list: subscriptionListState,
  byDevAndType: subscriptionsByDevAndTypeState,
}

export default combineReducers<SubscriptionsState>({
  list: subscriptionsListReducer,
  byDevAndType: subscriptionsByDevAndTypeReducer,
})
