import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { InstalledAppsItem } from '../reducers/installed-apps'

export const installedAppsRequestData = actionCreator<number>(ActionTypes.INSTALLED_APPS_REQUEST_DATA)
export const installedAppsRequestDataFailure = actionCreator<void>(ActionTypes.INSTALLED_APPS_REQUEST_DATA_FAILURE)
export const installedAppsLoading = actionCreator<boolean>(ActionTypes.INSTALLED_APPS_LOADING)
export const installedAppsReceiveData = actionCreator<InstalledAppsItem | undefined>(
  ActionTypes.INSTALLED_APPS_RECEIVE_DATA,
)
export const installedAppsClearData = actionCreator<null>(ActionTypes.INSTALLED_APPS_CLEAR_DATA)
