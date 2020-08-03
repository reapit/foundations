import { Action } from '../../types/core'
import { isType } from '../../utils/actions'
import { fetchDeveloperListSuccess, fetchDeveloperListFailed, fetchDeveloperList } from '../../actions/devs-management'
import { PagedResultDeveloperModel_ } from '@reapit/foundations-ts-definitions'
import { FetchDetailResult, getDefaultFetchListValue } from '@reapit/utils'

export type DeveloperListState = PagedResultDeveloperModel_ & Pick<FetchDetailResult<any>, 'isLoading' | 'errorMessage'>

export const defaultState: DeveloperListState = getDefaultFetchListValue()

const developerListReducer = (state: DeveloperListState = defaultState, action: Action<any>): DeveloperListState => {
  if (isType(action, fetchDeveloperList)) {
    return { ...state, isLoading: true }
  }

  if (isType(action, fetchDeveloperListSuccess)) {
    return {
      ...state,
      isLoading: false,
      ...(action.data || {}),
    }
  }

  if (isType(action, fetchDeveloperListFailed)) {
    return { ...state, isLoading: false, errorMessage: action.data }
  }

  return state
}

export default developerListReducer
