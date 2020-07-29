import { combineReducers } from 'redux'
import { appDetailReducer, AppDetailState } from './detail'
import { featureListReducer, FeatureListState } from './feature-list'
import { appsListReducer, AppsListState } from './list'

export interface AppsRootState {
  list: AppsListState
  featureList: FeatureListState
  detail: AppDetailState
}

export default combineReducers<AppsRootState>({
  list: appsListReducer,
  featureList: featureListReducer,
  detail: appDetailReducer,
})
