import { Action, FormState } from '@/types/core'
import { isType } from '@/utils/actions'
import { AppRevisionModel, ScopeModel } from '@reapit/foundations-ts-definitions'
import {
  fetchRevisionSuccess,
  fetchRevisionFailed,
  setRequestApproveRevisionFormState,
  setRequestDeclineRevisionFormState,
  fetchRevision,
} from '@/actions/revision-detail'
import { PagedResultDesktopIntegrationTypeModel } from '@/types/desktop-integration-types'
import { FetchDetailResult, getDefaultFetchDetailValue } from '@reapit/utils-common'

export interface RevisionDetailItem {
  data: AppRevisionModel
  scopes: ScopeModel[]
  desktopIntegrationTypes: PagedResultDesktopIntegrationTypeModel
}

export type RevisionDetailState = FetchDetailResult<RevisionDetailItem> & {
  formState: FormState
}

export const defaultState: RevisionDetailState = { ...getDefaultFetchDetailValue(), formState: 'PENDING' }

const revisionDetailReducer = (state: RevisionDetailState = defaultState, action: Action<any>): RevisionDetailState => {
  if (isType(action, setRequestApproveRevisionFormState)) {
    return {
      ...state,
      formState: action.data,
    }
  }

  if (isType(action, setRequestDeclineRevisionFormState)) {
    return {
      ...state,
      formState: action.data,
    }
  }

  if (isType(action, fetchRevision)) {
    return {
      ...state,
      errorMessage: '',
      isLoading: true,
      formState: 'PENDING',
    }
  }

  if (isType(action, fetchRevisionSuccess)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: '',
      data: action.data || null,
    }
  }

  if (isType(action, fetchRevisionFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  return state
}

export default revisionDetailReducer
