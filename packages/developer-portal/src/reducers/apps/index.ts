import { combineReducers } from 'redux'
import appListReducer, { AppListState } from './app-list'
import appDetailReducer, { AppDetailState } from './app-detail'

export type AppsRootState = {
  list: AppListState
  detail: AppDetailState
}
export default combineReducers<AppsRootState>({
  list: appListReducer,
  detail: appDetailReducer,
})
