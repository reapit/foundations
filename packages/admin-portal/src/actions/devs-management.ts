import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { PagedResultDeveloperModel_ } from '@reapit/foundations-ts-definitions'

export interface fetchDeveloperListValues {
  page: number
  queryString: string
}

export const fetchDeveloperList = actionCreator<fetchDeveloperListValues>(ActionTypes.FETCH_DEVELOPER_LIST)
export const fetchDeveloperListFailed = actionCreator<string>(ActionTypes.FETCH_DEVELOPER_LIST_FAILED)

export const fetchDeveloperListSuccess = actionCreator<PagedResultDeveloperModel_ | undefined>(
  ActionTypes.FETCH_DEVELOPER_LIST_SUCCESS,
)
