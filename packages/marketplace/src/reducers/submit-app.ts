import { Action, FormState } from '../types/core'
import { isType } from '../utils/actions'
import {
  submitAppSetFormState,
  submitAppLoading,
  submitAppReceiveData,
  submitAppWizzardChangeStep,
} from '../actions/submit-app'
import { ScopeModel } from '@reapit/foundations-ts-definitions'

export type FormStep = 'BEFORE_YOU_START' | 'INPUT_APP_NAME'

export interface SubmitAppState {
  loading: boolean
  formState: FormState
  submitAppData: {
    scopes: ScopeModel[]
  } | null
  isModalVisible: boolean
  formStep: FormStep
}

export const defaultState: SubmitAppState = {
  loading: false,
  formState: 'PENDING',
  submitAppData: null,
  isModalVisible: false,
  formStep: 'BEFORE_YOU_START',
}

const submitAppReducer = (state: SubmitAppState | undefined = defaultState, action: Action<any>): SubmitAppState => {
  if (isType(action, submitAppWizzardChangeStep)) {
    return {
      ...state,
      formStep: action.data.formStep,
    }
  }

  if (isType(action, submitAppSetFormState)) {
    return {
      ...state,
      formState: action.data || null,
    }
  }

  if (isType(action, submitAppLoading)) {
    return {
      ...state,
      loading: action.data,
    }
  }

  if (isType(action, submitAppReceiveData)) {
    return {
      ...state,
      submitAppData: {
        scopes: action.data,
      },
    }
  }

  return state
}

export default submitAppReducer
