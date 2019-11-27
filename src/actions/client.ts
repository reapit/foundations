import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { ClientItem } from '../reducers/client'
import { PagedResultAppSummaryModel_ } from '@/types/marketplace-api-schema'

export const clientRequestData = actionCreator<number>(ActionTypes.CLIENT_REQUEST_DATA)
export const clientRequestDataFailure = actionCreator<void>(ActionTypes.CLIENT_REQUEST_FAILURE)
export const clientLoading = actionCreator<boolean>(ActionTypes.CLIENT_LOADING)
export const clientReceiveData = actionCreator<ClientItem | undefined>(ActionTypes.CLIENT_RECEIVE_DATA)
export const clientClearData = actionCreator<null>(ActionTypes.CLIENT_CLEAR_DATA)
export const clientSearchApps = actionCreator<string>(ActionTypes.CLIENT_SEARCH_APPS)
export const clientReceiveSearchApps = actionCreator<PagedResultAppSummaryModel_>(
  ActionTypes.CLIENT_RECEIVE_SEARCH_APPS
)
