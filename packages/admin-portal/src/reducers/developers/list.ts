import { Action } from '../../types/core'
import { isType } from '../../utils/actions'
import {
  devsManagementLoading,
  devsManagementReceiveData,
  devsManagementRequestDataFailure,
} from '../../actions/devs-management'
import { PagedResultDeveloperModel_ } from '@reapit/foundations-ts-definitions'
import { FetchDetailResult, getDefaultFetchListValue } from '@reapit/utils'

export type DeveloperListState = PagedResultDeveloperModel_ & Pick<FetchDetailResult<any>, 'isLoading' | 'errorMessage'>

export const defaultState: DeveloperListState = getDefaultFetchListValue()

const developerListReducer = (state: DeveloperListState = defaultState, action: Action<any>): DeveloperListState => {
  if (isType(action, devsManagementLoading)) {
    return { ...state, isLoading: action.data }
  }

  if (isType(action, devsManagementReceiveData)) {
    return {
      ...state,
      isLoading: false,
      ...(action.data || {}),
    }
  }

  if (isType(action, devsManagementRequestDataFailure)) {
    return { ...state, isLoading: false }
  }

  return state
}

export default developerListReducer
