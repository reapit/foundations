import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { PagedResultDeveloperModel_ } from '@reapit/foundations-ts-definitions'

export interface DevsManagementRequestDataValues {
  page: number
  queryString: string
}

export const devsManagementRequestData = actionCreator<DevsManagementRequestDataValues>(
  ActionTypes.DEVS_MANAGEMENT_REQUEST_DATA,
)
export const devsManagementRequestDataFailure = actionCreator<void>(ActionTypes.DEVS_MANAGEMENT_REQUEST_FAILURE)
export const devsManagementLoading = actionCreator<boolean>(ActionTypes.DEVS_MANAGEMENT_LOADING)
export const devsManagementReceiveData = actionCreator<PagedResultDeveloperModel_ | undefined>(
  ActionTypes.DEVS_MANAGEMENT_RECEIVE_DATA,
)
