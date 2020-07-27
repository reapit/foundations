import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { FetchAppListParams } from '@/reducers/apps/app-list'
import { PagedResultAppSummaryModel_ } from '@reapit/foundations-ts-definitions'

const { FETCH_APP_LIST, FETCH_APP_LIST_SUCCESS, FETCH_APP_LIST_FAILED, CLEAR_APP_LIST } = ActionTypes

export const fetchAppList = actionCreator<FetchAppListParams>(FETCH_APP_LIST)
export const fetchAppListSuccess = actionCreator<PagedResultAppSummaryModel_>(FETCH_APP_LIST_SUCCESS)
export const fetchAppListFailed = actionCreator<string>(FETCH_APP_LIST_FAILED)
export const clearAppList = actionCreator<void>(CLEAR_APP_LIST)
