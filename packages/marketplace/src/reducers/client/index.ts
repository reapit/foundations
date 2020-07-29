import { combineReducers } from 'redux'
import { installedAppReducer } from './installed-apps'
import appDetailReducer, { ClientAppDetailState } from './app-detail'
import clientReducer, { ClientAppSummaryState } from './app-summary'
import { InstalledAppsState } from './installed-apps'
import webComponentReducer, { WebComponentState } from './web-component'

export interface ClientRootState {
  appSummary: ClientAppSummaryState
  appDetail: ClientAppDetailState
  webComponent: WebComponentState
  installedApps: InstalledAppsState
}

export default combineReducers<ClientRootState>({
  appSummary: clientReducer,
  appDetail: appDetailReducer,
  webComponent: webComponentReducer,
  installedApps: installedAppReducer,
})
