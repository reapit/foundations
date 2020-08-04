import { combineReducers } from 'redux'
import { webhooksSubscriptionsReducer, WebhooksSubscriptionsListState } from './list'
import { webhookEditReducer, WebhookEditState } from './webhook-edit-modal'

export type WebhooksSubscriptionsRootState = {
  list: WebhooksSubscriptionsListState
  edit: WebhookEditState
}
export default combineReducers<WebhooksSubscriptionsRootState>({
  list: webhooksSubscriptionsReducer,
  edit: webhookEditReducer,
})
