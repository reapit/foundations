import { Action, FormState } from '@/types/core'
import { isType } from '@/utils/actions'
import { AppRevisionModel, ScopeModel } from '@reapit/foundations-ts-definitions'
import {
  fetchRevisionDataSuccess,
  fetchRevisionDataFailed,
  setRequestApproveRevisionFormState,
  setRequestDeclineRevisionFormState,
  fetchRevisionData,
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

  if (isType(action, fetchRevisionData)) {
    return {
      ...state,
      errorMessage: '',
      isLoading: true,
      formState: 'PENDING',
    }
  }

  if (isType(action, fetchRevisionDataSuccess)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: '',
      data: action.data || null,
    }
  }

  if (isType(action, fetchRevisionDataFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: '',
    }
  }

  return state
}

export default revisionDetailReducer
