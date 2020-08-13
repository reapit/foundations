import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  fetchCurrentMember,
  fetchCurrentMemberSuccess,
  updateCurrentMember,
  updateCurrentMemberSuccess,
  updateCurrentMemberFailed,
  fetchCurrentMemberFailed,
} from '@/actions/current-member'
import { MemberModel } from '@reapit/foundations-ts-definitions'

export type CurrentMemberRootState = {
  data: MemberModel | null
  isLoading: boolean
  update: {
    isLoading: boolean
  }
}

export const defaultState: CurrentMemberRootState = {
  isLoading: false,
  data: null,
  update: {
    isLoading: false,
  },
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
        isLoading: true,
      },
    }
  }

  if (isType(action, updateCurrentMemberSuccess)) {
    return {
      ...state,
      update: {
        isLoading: false,
      },
    }
  }

  if (isType(action, updateCurrentMemberFailed)) {
    return {
      ...state,
      update: {
        isLoading: false,
      },
    }
  }

  return state
}

export default currentMemberReducer
