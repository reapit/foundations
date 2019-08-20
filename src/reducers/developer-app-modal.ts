import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  setDeveloperAppModalStateViewDetail,
  setDeveloperAppModalStateEditDetail,
  setDeveloperAppModalStateDelete
} from '../actions/developer-app-modal'

export type DeveloperAppModalState = 'VIEW_DETAIL' | 'EDIT_APP_DETAIL' | 'DELETE_APP_CONFIRM'

export const defaultState: DeveloperAppModalState = 'VIEW_DETAIL'

const appDeveloperModalReducer = (
  state: DeveloperAppModalState = defaultState,
  action: Action<any>
): DeveloperAppModalState => {
  if (isType(action, setDeveloperAppModalStateViewDetail)) {
    return 'VIEW_DETAIL'
  }

  if (isType(action, setDeveloperAppModalStateEditDetail)) {
    return 'EDIT_APP_DETAIL'
  }

  if (isType(action, setDeveloperAppModalStateDelete)) {
    return 'DELETE_APP_CONFIRM'
  }

  return state
}

export default appDeveloperModalReducer
