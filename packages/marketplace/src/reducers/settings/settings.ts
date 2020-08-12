import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { settingLoadingVisibility } from '@/actions/settings'

export interface SettingsState {
  loading: boolean
}

export const defaultState: SettingsState = {
  loading: false,
}

export const settingReducer = (state: SettingsState = defaultState, action: Action<any>): SettingsState => {
  if (isType(action, settingLoadingVisibility)) {
    return {
      ...state,
      loading: action.data,
    }
  }

  return state
}

export default settingReducer
