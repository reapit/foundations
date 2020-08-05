import { combineReducers } from 'redux'
import installationsListReducer, { InstallationsListState } from './installations-list'
import installationsFilterListReducer, { InstallationsFilterListState } from './installations-filted-list'
import formStateReducer, { FormStateType } from './form-state'

export type InstallationsRootState = {
  installationsList: InstallationsListState
  installationsFilterList: InstallationsFilterListState
  formState: FormStateType
}
export default combineReducers<InstallationsRootState>({
  installationsList: installationsListReducer,
  installationsFilterList: installationsFilterListReducer,
  formState: formStateReducer,
})
