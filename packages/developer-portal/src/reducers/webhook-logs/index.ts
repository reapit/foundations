import { combineReducers } from 'redux'
import { webhookLogsReducer, WebhookLogsListState } from './list'

export type WebhookLogRootState = {
  list: WebhookLogsListState
}
export default combineReducers<WebhookLogRootState>({
  list: webhookLogsReducer,
})
