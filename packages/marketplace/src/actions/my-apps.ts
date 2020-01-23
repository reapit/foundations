import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { MyAppsItem } from '../reducers/my-apps'

export const myAppsRequestData = actionCreator<number>(ActionTypes.MY_APPS_REQUEST_DATA)
export const myAppsRequestDataFailure = actionCreator<void>(ActionTypes.MY_APPS_REQUEST_DATA_FAILURE)
export const myAppsLoading = actionCreator<boolean>(ActionTypes.MY_APPS_LOADING)
export const myAppsReceiveData = actionCreator<MyAppsItem | undefined>(ActionTypes.MY_APPS_RECEIVE_DATA)
export const myAppsClearData = actionCreator<null>(ActionTypes.MY_APPS_CLEAR_DATA)
