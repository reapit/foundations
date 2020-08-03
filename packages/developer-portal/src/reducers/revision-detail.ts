import { Action, FormState } from '../types/core'
import { isType } from '../utils/actions'
import {
  AppRevisionModel,
  ScopeModel,
  PagedResultDesktopIntegrationTypeModel_,
} from '@reapit/foundations-ts-definitions'
import { declineRevisionSetFormState } from '../actions/revision-detail'

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
  if (isType(action, declineRevisionSetFormState)) {
    return {
      ...state,
      declineFormState: action.data,
    }
  }

  return state
}

export default revisionDetailReducer
