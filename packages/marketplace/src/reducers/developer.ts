import { Action, FormState } from '../types/core'
import { isType } from '../utils/actions'
import {
  developerLoading,
  developerReceiveData,
  developerClearData,
  developerSetFormState,
  setMyIdentity,
  fetchBilling,
  fetchBillingSuccess,
  fetchBillingFailure,
} from '@/actions/developer'
import { PagedResultAppSummaryModel_, ScopeModel, DeveloperModel } from '@reapit/foundations-ts-definitions'
import { developerAppShowModal } from '@/actions/developer-app-modal'

export interface DeveloperRequestParams {
  page: number
  appsPerPage?: number
}

export interface DeveloperItem {
  data: PagedResultAppSummaryModel_
  scopes: ScopeModel[]
}

export type RequestByPeriod = {
  period: string
  periodStart: string
  periodEnd: string
  periodName: string
  requestCount: number
  endpointCount: number
  netAmount: number
  grossAmount: number
  vatAmount: number
}

export type Billing = {
  from: string
  to: string
  requestsByPeriod: RequestByPeriod[]
}

export interface DeveloperState {
  loading: boolean
  developerData: DeveloperItem | null
  formState: FormState
  isVisible: boolean
  myIdentity: DeveloperModel | null
  billing: Billing | null
  isServiceChartLoading: boolean
  error: unknown
}

export const defaultState: DeveloperState = {
  loading: false,
  developerData: null,
  formState: 'PENDING',
  isVisible: false,
  myIdentity: null,
  billing: null,
  isServiceChartLoading: true,
  error: null,
}

const developerReducer = (state: DeveloperState = defaultState, action: Action<any>): DeveloperState => {
  if (isType(action, developerLoading)) {
    return {
      ...state,
      loading: action.data,
    }
  }

  if (isType(action, developerReceiveData)) {
    return {
      ...state,
      loading: false,
      developerData: action.data || null,
    }
  }

  if (isType(action, developerClearData)) {
    return {
      ...state,
      loading: false,
      developerData: action.data,
    }
  }

  if (isType(action, developerSetFormState)) {
    return {
      ...state,
      formState: action.data,
    }
  }

  if (isType(action, developerAppShowModal)) {
    return {
      ...state,
      isVisible: action.data,
    }
  }

  if (isType(action, setMyIdentity)) {
    return {
      ...state,
      myIdentity: action.data || null,
    }
  }

  if (isType(action, fetchBilling)) {
    return {
      ...state,
      isServiceChartLoading: true,
    }
  }

  if (isType(action, fetchBillingSuccess)) {
    return {
      ...state,
      billing: action.data || null,
      isServiceChartLoading: false,
    }
  }

  if (isType(action, fetchBillingFailure)) {
    return {
      ...state,
      isServiceChartLoading: false,
      error: action.data,
    }
  }

  return state
}

export default developerReducer
