import { combineReducers } from 'redux'
import { desktopIntegrationTypesListReducer, DesktopIntegrationTypesListState } from './list'

export type DesktopIntegrationTypeRootState = {
  list: DesktopIntegrationTypesListState
}

export default combineReducers<DesktopIntegrationTypeRootState>({
  list: desktopIntegrationTypesListReducer,
})
