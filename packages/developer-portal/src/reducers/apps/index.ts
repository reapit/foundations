import { combineReducers } from 'redux'
import appListReducer, { AppListState } from './app-list'
import appDetailReducer, { AppDetailState } from './app-detail'
import appAuthenticationReducer, { AppAuthenticationState } from './app-authentication'
import createAppReducer, { CreateAppState } from './create-app'

export type AppsRootState = {
  list: AppListState
  detail: AppDetailState
  authentication: AppAuthenticationState
  createApp: CreateAppState
}
export default combineReducers<AppsRootState>({
  list: appListReducer,
  detail: appDetailReducer,
  authentication: appAuthenticationReducer,
  createApp: createAppReducer,
})
