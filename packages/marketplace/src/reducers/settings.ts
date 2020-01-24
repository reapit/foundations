import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { requestDeveloperDataSuccess, settingShowLoading } from '@/actions/settings'

export interface SettingsState {
  loading: boolean
  developerInfomation: DeveloperModel | null
}

export const defaultState: SettingsState = {
  loading: true,
  developerInfomation: null,
}

const settingReducer = (state: SettingsState = defaultState, action: Action<any>): SettingsState => {
  if (isType(action, settingShowLoading)) {
    return {
      ...state,
      loading: action.data,
    }
  }

  if (isType(action, requestDeveloperDataSuccess)) {
    return {
      ...state,
      developerInfomation: action.data,
    }
  }

  return state
}

export default settingReducer
