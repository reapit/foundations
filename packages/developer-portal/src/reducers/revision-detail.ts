import { Action, FormState } from '../types/core'
import { isType } from '../utils/actions'
import {
  AppRevisionModel,
  ScopeModel,
  PagedResultDesktopIntegrationTypeModel_,
} from '@reapit/foundations-ts-definitions'
import {
  revisionDetailLoading,
  revisionDetailReceiveData,
  revisionDetailClearData,
  revisionDetailFailure,
  declineRevisionSetFormState,
} from '../actions/revision-detail'

export interface RevisionDetailItem {
  data: AppRevisionModel
  scopes: ScopeModel[]
  desktopIntegrationTypes: PagedResultDesktopIntegrationTypeModel_
}

export interface RevisionDetailState {
  loading: boolean
  error: boolean
  revisionDetailData: RevisionDetailItem | null
  declineFormState: FormState
}

export const defaultState: RevisionDetailState = {
  loading: false,
  error: false,
  revisionDetailData: null,
  declineFormState: 'PENDING',
}

const revisionDetailReducer = (state: RevisionDetailState = defaultState, action: Action<any>): RevisionDetailState => {
  if (isType(action, revisionDetailLoading)) {
    return {
      ...state,
      error: false,
      declineFormState: 'PENDING',
      loading: action.data,
    }
  }

  if (isType(action, revisionDetailReceiveData)) {
    return {
      ...state,
      loading: false,
      error: false,
      revisionDetailData: action.data || null,
    }
  }

  if (isType(action, revisionDetailClearData)) {
    return {
      ...state,
      loading: false,
      error: false,
      revisionDetailData: action.data,
      declineFormState: 'PENDING',
    }
  }

  if (isType(action, revisionDetailFailure)) {
    return {
      ...state,
      loading: false,
      error: true,
    }
  }

  if (isType(action, declineRevisionSetFormState)) {
    return {
      ...state,
      declineFormState: action.data,
    }
  }

  return state
}

export default revisionDetailReducer
