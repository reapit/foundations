import { combineReducers } from 'redux'
import appDetailReducer, { ClientAppDetailState } from './app-detail'
import clientReducer, { ClientAppSummaryState } from './app-summary'

export interface ClientRootState {
  appSummary: ClientAppSummaryState
  appDetail: ClientAppDetailState
}

export default combineReducers<ClientRootState>({
  appSummary: clientReducer,
  appDetail: appDetailReducer,
})
