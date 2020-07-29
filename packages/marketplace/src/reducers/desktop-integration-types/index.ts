import { combineReducers } from 'redux'
import { desktopIntegrationTypesReducer, DesktopIntegrationTypesState } from './list'

export type DesktopIntegrationTypeRootState = {
  list: DesktopIntegrationTypesState
}

export default combineReducers<DesktopIntegrationTypeRootState>({
  list: desktopIntegrationTypesReducer,
})
