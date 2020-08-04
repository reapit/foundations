import { combineReducers } from 'redux'
import appListReducer, { AppListState } from './app-list'
import appDetailReducer, { AppDetailState } from './app-detail'
import appAuthenticationReducer, { AppAuthenticationState } from './app-authentication'
import appRevisionDetailReducer, { AppRevisionDetailState } from './app-revision-detail'
import appRevisionListReducer, { AppRevisionListState } from './app-revision-list'
import createAppReducer, { CreateAppState } from './create-app'
import deleteAppReducer, { DeleteAppState } from './delete-app'
import declineAppRevisionReducer, { DeclineAppRevisionState } from './decline-app-revision'
import createAppRevisionReducer, { CreateAppRevisionState } from './create-app-revision'

export type AppsRootState = {
  list: AppListState
  detail: AppDetailState
  authentication: AppAuthenticationState
  createApp: CreateAppState
  deleteApp: DeleteAppState
  revisions: AppsRevisionsRootState
}

export type AppsRevisionsRootState = {
  detail: AppRevisionDetailState
  list: AppRevisionListState
  declineRevision: DeclineAppRevisionState
  createRevision: CreateAppRevisionState
}

export default combineReducers<AppsRootState>({
  list: appListReducer,
  detail: appDetailReducer,
  authentication: appAuthenticationReducer,
  createApp: createAppReducer,
  deleteApp: deleteAppReducer,
  revisions: combineReducers<AppsRevisionsRootState>({
    detail: appRevisionDetailReducer,
    list: appRevisionListReducer,
    declineRevision: declineAppRevisionReducer,
    createRevision: createAppRevisionReducer,
  }),
})
