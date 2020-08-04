import { combineReducers } from 'redux'
import { webhooksSubscriptionsReducer, WebhooksSubscriptionsListState } from './list'

export type WebhooksSubscriptionsRootState = {
  list: WebhooksSubscriptionsListState
}
export default combineReducers<WebhooksSubscriptionsRootState>({
  list: webhooksSubscriptionsReducer,
})
