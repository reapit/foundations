import { combineReducers } from 'redux'
import { webhooksTopicsReducer, WebhooksTopicsListState } from './list'

export type WebhooksTopicsRootState = {
  list: WebhooksTopicsListState
}
export default combineReducers<WebhooksTopicsRootState>({
  list: webhooksTopicsReducer,
})
