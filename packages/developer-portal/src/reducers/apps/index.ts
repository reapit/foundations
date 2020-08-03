import { combineReducers } from 'redux'
import appListReducer, { AppListState } from './app-list'
import appDetailReducer, { AppDetailState } from './app-detail'
import appAuthenticationReducer, { AppAuthenticationState } from './app-authentication'
import appRevisionDetailReducer, { AppRevisionDetailState } from './app-revision-detail'
import createAppReducer, { CreateAppState } from './create-app'
import deleteAppReducer, { DeleteAppState } from './delete-app'
import declineAppRevisionReducer, { DeclineAppRevisionState } from './decline-app-revision'

export type AppsRootState = {
  list: AppListState
  detail: AppDetailState
  authentication: AppAuthenticationState
  createApp: CreateAppState
  deleteApp: DeleteAppState
  revisions: {
    detail: AppRevisionDetailState
    declineRevision: DeclineAppRevisionState
  }
}

export type AppsRevisionsRootState = {
  detail: AppRevisionDetailState
  declineRevision: DeclineAppRevisionState
}

export default combineReducers<AppsRootState>({
  list: appListReducer,
  detail: appDetailReducer,
  authentication: appAuthenticationReducer,
  createApp: createAppReducer,
  deleteApp: deleteAppReducer,
  revisions: combineReducers<AppsRevisionsRootState>({
    detail: appRevisionDetailReducer,
    declineRevision: declineAppRevisionReducer,
  }),
})
