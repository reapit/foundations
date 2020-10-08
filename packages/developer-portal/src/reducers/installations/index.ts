import { combineReducers } from 'redux'
import installationsListReducer, { InstallationsListState } from './installations-list'
import installationsFilterListReducer, { InstallationsFilterListState } from './installations-filted-list'
import formStateReducer, { FormStateType } from './form-state'
import { installReducer, InstallState } from './install'
import { uninstallReducer, UninstallState } from './uninstall'

export type InstallationsRootState = {
  installationsList: InstallationsListState
  installationsFilterList: InstallationsFilterListState
  formState: FormStateType
  install: InstallState
  uninstall: UninstallState
}
export default combineReducers<InstallationsRootState>({
  installationsList: installationsListReducer,
  installationsFilterList: installationsFilterListReducer,
  formState: formStateReducer,
  install: installReducer,
  uninstall: uninstallReducer,
})
