import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { deleteApp, deleteAppSuccess, deleteAppFailed } from '@/actions/apps'

export type DeleteAppState = {
  isLoading: boolean
}

export const defaultState: DeleteAppState = {
  isLoading: false,
}

const deleteAppReducer = (state: DeleteAppState = defaultState, action: Action<any>): DeleteAppState => {
  if (isType(action, deleteApp)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (isType(action, deleteAppSuccess)) {
    return {
      ...state,
      isLoading: false,
    }
  }

  if (isType(action, deleteAppFailed)) {
    return {
      ...state,
      isLoading: false,
    }
  }

  return state
}

export default deleteAppReducer
