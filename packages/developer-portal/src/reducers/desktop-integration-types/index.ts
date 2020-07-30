import { combineReducers } from 'redux'
import desktopIntegrationTypeListReducer, { DesktopIntegrationTypeListState } from './desktop-integration-type-list'

export type DesktopIntegrationTypesRootState = {
  list: DesktopIntegrationTypeListState
}
export default combineReducers<DesktopIntegrationTypesRootState>({
  list: desktopIntegrationTypeListReducer,
})
