import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { PagedResultAppRevisionModel_ } from '@reapit/foundations-ts-definitions'
import { FetchAppRevisionsListParams } from '@/services/apps'

const {
  FETCH_APP_REVISION_LIST,
  FETCH_APP_REVISION_LIST_SUCCESS,
  FETCH_APP_REVISION_LIST_FAILED,
  CLEAR_APP_REVISION_LIST,
} = ActionTypes

export const fetchAppRevisionList = actionCreator<FetchAppRevisionsListParams>(FETCH_APP_REVISION_LIST)
export const fetchAppRevisionListSuccess = actionCreator<PagedResultAppRevisionModel_>(FETCH_APP_REVISION_LIST_SUCCESS)
export const fetchAppRevisionListFailed = actionCreator<string>(FETCH_APP_REVISION_LIST_FAILED)
export const clearAppRevisionList = actionCreator<void>(CLEAR_APP_REVISION_LIST)
