import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { fetchCurrentMember, fetchCurrentMemberSuccess, updateCurrentMember } from '@/actions/current-member'
import { MemberModel } from '@reapit/foundations-ts-definitions'

export type CurrentMemberRootState = {
  data: MemberModel | null
  isLoading: boolean
}

export const defaultState: CurrentMemberRootState = {
  isLoading: false,
  data: null,
}

const currentMemberReducer = (
  state: CurrentMemberRootState = defaultState,
  action: Action<any>,
): CurrentMemberRootState => {
  if (isType(action, fetchCurrentMember)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (isType(action, fetchCurrentMemberSuccess)) {
    return {
      ...state,
      isLoading: false,
      data: action.data,
    }
  }

  if (isType(action, updateCurrentMember)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  return state
}

export default currentMemberReducer
