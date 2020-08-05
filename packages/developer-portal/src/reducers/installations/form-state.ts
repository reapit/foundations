import { Action, FormState } from '@/types/core'
import { isType } from '@/utils/actions'
import { setInstallationsFormState } from '@/actions/installations'

export type FormStateType = {
  state: FormState
}

export const defaultState: FormStateType = {
  state: 'PENDING',
}

const formStateReducer = (state: FormStateType = defaultState, action: Action<any>): FormStateType => {
  if (isType(action, setInstallationsFormState)) {
    return {
      ...state,
      state: action.data,
    }
  }
  return state
}

export default formStateReducer
