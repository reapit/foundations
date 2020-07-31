import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { ScopeModel } from '@reapit/foundations-ts-definitions'

export const fetchScopeList = actionCreator<void>(ActionTypes.FETCH_SCOPE_LIST)
export const fetchScopeListSuccess = actionCreator<ScopeModel[]>(ActionTypes.FETCH_SCOPE_LIST_SUCCESS)
export const fetchScopeListFailed = actionCreator<string>(ActionTypes.FETCH_SCOPE_LIST_FAILED)
