import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  fetchCurrentMember,
  fetchCurrentMemberSuccess,
  updateCurrentMember,
  updateCurrentMemberSuccess,
  updateCurrentMemberFailed,
  fetchCurrentMemberFailed,
} from '@/actions/current-member'
import { MemberModel } from '@reapit/foundations-ts-definitions'

export type CurrentMemberUpdateState = 'UNKNOWN' | 'SUCCESS' | 'FAILED'

export type CurrentMemberRootState = {
  data: MemberModel
  isLoading: boolean
  update: {
    state: CurrentMemberUpdateState
    isLoading: boolean
  }
}

export const defaultState: CurrentMemberRootState = {
  isLoading: false,
  data: {},
  update: {
    state: 'UNKNOWN',
    isLoading: false,
  },
}

export const currentMemberReducer = (
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

  if (isType(action, fetchCurrentMemberFailed)) {
    return {
      ...state,
      isLoading: false,
    }
  }

  if (isType(action, updateCurrentMember)) {
    return {
      ...state,
      update: {
        ...state.update,
        isLoading: true,
      },
    }
  }

  if (isType(action, updateCurrentMemberSuccess)) {
    return {
      ...state,
      update: {
        state: 'SUCCESS',
        isLoading: false,
      },
    }
  }

  if (isType(action, updateCurrentMemberFailed)) {
    return {
      ...state,
      update: {
        state: 'FAILED',
        isLoading: false,
      },
    }
  }

  return state
}

export default currentMemberReducer
