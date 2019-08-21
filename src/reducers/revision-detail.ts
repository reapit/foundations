import { Action, FormState } from '../types/core'
import { isType } from '../utils/actions'
import { AppRevisionModel, ScopeModel } from '@/types/marketplace-api-schema'
import {
  revisionDetailLoading,
  revisionDetailReceiveData,
  revisionDetailClearData,
  revisionDetailFailure,
  approveRevisionSetFormState,
  declineRevisionSetFormState
} from '../actions/revision-detail'

export interface RevisionDetailItem {
  data: AppRevisionModel
  scopes: ScopeModel[]
}

export interface RevisionDetailState {
  loading: boolean
  error: boolean
  revisionDetailData: RevisionDetailItem | null
  approveFormState: FormState
  declineFormState: FormState
}

export const defaultState: RevisionDetailState = {
  loading: false,
  error: false,
  revisionDetailData: null,
  approveFormState: 'PENDING',
  declineFormState: 'PENDING'
}

const revisionDetailReducer = (state: RevisionDetailState = defaultState, action: Action<any>): RevisionDetailState => {
  if (isType(action, revisionDetailLoading)) {
    return {
      ...state,
      error: false,
      approveFormState: 'PENDING',
      declineFormState: 'PENDING',
      loading: action.data
    }
  }

  if (isType(action, revisionDetailReceiveData)) {
    return {
      ...state,
      loading: false,
      error: false,
      revisionDetailData: action.data || null
    }
  }

  if (isType(action, revisionDetailClearData)) {
    return {
      ...state,
      loading: false,
      error: false,
      revisionDetailData: action.data
    }
  }

  if (isType(action, revisionDetailFailure)) {
    return {
      ...state,
      loading: false,
      error: true
    }
  }

  if (isType(action, approveRevisionSetFormState)) {
    return {
      ...state,
      approveFormState: action.data
    }
  }

  if (isType(action, declineRevisionSetFormState)) {
    return {
      ...state,
      declineFormState: action.data
    }
  }

  return state
}

export default revisionDetailReducer
