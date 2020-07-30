import { combineReducers } from 'redux'
import { installReducer, InstallState } from './install'
import { uninstallReducer, UninstallState } from './uninstall'

export type InstallationsRootState = {
  install: InstallState
  uninstall: UninstallState
}

export default combineReducers<InstallationsRootState>({
  install: installReducer,
  uninstall: uninstallReducer,
})
