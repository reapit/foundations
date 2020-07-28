import { combineReducers } from 'redux'
import appListReducer, { AppListState } from './app-list'
import appDetailReducer, { AppDetailState } from './app-detail'
import appAuthenticationReducer, { AppAuthenticationState } from './app-authentication'

export type AppsRootState = {
  list: AppListState
  detail: AppDetailState
  authentication: AppAuthenticationState
}
export default combineReducers<AppsRootState>({
  list: appListReducer,
  detail: appDetailReducer,
  authentication: appAuthenticationReducer,
})
