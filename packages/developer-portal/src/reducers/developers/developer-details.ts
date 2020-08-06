import { Action } from '../../types/core'
import { isType } from '../../utils/actions'
import { fetchDeveloperDetails, fetchDeveloperDetailsSuccess, fetchDeveloperDetailsFailed } from '@/actions/developers'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'

export interface DeveloperDetailsState {
  isLoading: boolean
  data: DeveloperModel | null
}

export const defaultState: DeveloperDetailsState = {
  isLoading: false,
  data: null,
}

const developerDetailsReducer = (
  state: DeveloperDetailsState = defaultState,
  action: Action<any>,
): DeveloperDetailsState => {
  if (isType(action, fetchDeveloperDetails)) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (isType(action, fetchDeveloperDetailsSuccess)) {
    return {
      ...state,
      data: action.data,
      isLoading: false,
    }
  }
  if (isType(action, fetchDeveloperDetailsFailed)) {
    return {
      ...state,
      isLoading: false,
    }
  }

  return state
}

export default developerDetailsReducer
