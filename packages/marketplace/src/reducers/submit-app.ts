import { Action, FormState } from '../types/core'
import { isType } from '../utils/actions'
import { submitAppSetFormState, submitAppLoading, submitAppReceiveData } from '../actions/submit-app'
import { CreateAppModel, ScopeModel } from '@reapit/foundations-ts-definitions'

export interface SubmitAppState {
  loading: boolean
  formState: FormState
  submitAppData: {
    scopes: ScopeModel[]
  } | null
}

export const defaultState: SubmitAppState = {
  loading: false,
  formState: 'PENDING',
  submitAppData: null
}

const submitAppReducer = (state: SubmitAppState | undefined = defaultState, action: Action<any>): SubmitAppState => {
  if (isType(action, submitAppSetFormState)) {
    return {
      ...state,
      formState: action.data || null
    }
  }

  if (isType(action, submitAppLoading)) {
    return {
      ...state,
      loading: action.data
    }
  }

  if (isType(action, submitAppReceiveData)) {
    return {
      ...state,
      submitAppData: {
        scopes: action.data
      }
    }
  }

  return state
}

export default submitAppReducer
