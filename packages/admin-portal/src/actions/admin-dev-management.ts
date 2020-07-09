import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { PagedResultDeveloperModel_ } from '@reapit/foundations-ts-definitions'

export interface AdminDevManagementRequestDataValues {
  page: number
  queryString: string
}

export const adminDevManagementRequestData = actionCreator<AdminDevManagementRequestDataValues>(
  ActionTypes.ADMIN_DEV_MANAGEMENT_REQUEST_DATA,
)
export const adminDevManagementRequestDataFailure = actionCreator<void>(
  ActionTypes.ADMIN_DEV_MANAGEMENT_REQUEST_FAILURE,
)
export const adminDevManagementLoading = actionCreator<boolean>(ActionTypes.ADMIN_DEV_MANAGEMENT_LOADING)
export const adminDevManagementReceiveData = actionCreator<PagedResultDeveloperModel_ | undefined>(
  ActionTypes.ADMIN_DEV_MANAGEMENT_RECEIVE_DATA,
)
