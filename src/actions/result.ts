import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { PagedResultContactModel_ } from '@reapit/foundations-ts-definitions'

export interface SearchParams {
  name?: string
  address?: string
  identityCheck?: 'PASS' | 'FAIL' | 'PENDING' | 'CANCELLED' | 'WARNINGS' | 'UNCHECKED'
}

export type ContactsParams = SearchParams & {
  pageNumber: number
}

export const resultSetSearchParams = actionCreator<SearchParams>(ActionTypes.RESULT_SET_SEARCH_PARAMS)
export const resultRequestData = actionCreator<ContactsParams>(ActionTypes.RESULT_REQUEST_DATA)
export const resultReceiveData = actionCreator<PagedResultContactModel_>(ActionTypes.RESULT_RECEIVE_DATA)
export const resultRequestDataFailure = actionCreator<void>(ActionTypes.RESULT_REQUEST_FAILURE)
