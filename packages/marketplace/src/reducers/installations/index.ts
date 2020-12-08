import { combineReducers } from 'redux'
import { installReducer, InstallState } from './install'
import { uninstallReducer, UninstallState } from './uninstall'
import { installationsListReducer, InstallationsListState } from './list'

export type InstallationsRootState = {
  install: InstallState
  uninstall: UninstallState
  list: InstallationsListState
}

export default combineReducers<InstallationsRootState>({
  install: installReducer,
  uninstall: uninstallReducer,
  list: installationsListReducer,
})
