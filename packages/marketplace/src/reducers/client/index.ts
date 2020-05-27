import { combineReducers } from 'redux'
import appDetailReducer, { ClientAppDetailState } from './app-detail'
import clientReducer, { ClientAppSummaryState } from './app-summary'
import webComponentReducer, { WebComponentState } from './web-component'

export interface ClientRootState {
  appSummary: ClientAppSummaryState
  appDetail: ClientAppDetailState
  webComponent: WebComponentState
}

export default combineReducers<ClientRootState>({
  appSummary: clientReducer,
  appDetail: appDetailReducer,
  webComponent: webComponentReducer,
})
