import { Action, FormState } from '@/types/core'
import { isType } from '@/utils/actions'
import { AppRevisionModel, ScopeModel } from '@reapit/foundations-ts-definitions'
import {
  revisionDetailLoading,
  revisionDetailReceiveData,
  revisionDetailFailure,
  approveRevisionSetFormState,
  declineRevisionSetFormState,
} from '@/actions/revision-detail'
import { PagedResultDesktopIntegrationTypeModel_ } from '@/types/desktop-integration-types'
import { FetchDetailResult, getDefaultFetchDetailValue } from '@reapit/utils'

export interface RevisionDetailItem {
  data: AppRevisionModel
  scopes: ScopeModel[]
  desktopIntegrationTypes: PagedResultDesktopIntegrationTypeModel_
}

export type RevisionDetailState = FetchDetailResult<RevisionDetailItem> & {
  formState: FormState
}

export const defaultState: RevisionDetailState = { ...getDefaultFetchDetailValue(), formState: 'PENDING' }

const revisionDetailReducer = (state: RevisionDetailState = defaultState, action: Action<any>): RevisionDetailState => {
  if (isType(action, approveRevisionSetFormState)) {
    return {
      ...state,
      formState: action.data,
    }
  }

  if (isType(action, declineRevisionSetFormState)) {
    return {
      ...state,
      formState: action.data,
    }
  }

  if (isType(action, revisionDetailLoading)) {
    return {
      ...state,
      errorMessage: '',
      isLoading: action.data,
      formState: 'PENDING',
    }
  }

  if (isType(action, revisionDetailReceiveData)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: '',
      data: action.data || null,
    }
  }

  if (isType(action, revisionDetailFailure)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: '',
    }
  }

  return state
}

export default revisionDetailReducer
