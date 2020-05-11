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
  developerFetchAppDetail,
  developerFetchAppDetailSuccess,
  developerFetchAppDetailFailed,
} from '@/actions/developer'
import {
  PagedResultAppSummaryModel_,
  ScopeModel,
  DeveloperModel,
  AppDetailModel,
} from '@reapit/foundations-ts-definitions'
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
  developerAppDetail: DeveloperAppDetailState
  developerData: DeveloperItem | null
  formState: FormState
  isVisible: boolean
  myIdentity: DeveloperModel | null
  billing: Billing | null
  isServiceChartLoading: boolean
  error: unknown
}

export type AppDetailData = (AppDetailModel & { apiKey?: string }) | null

export interface DeveloperAppDetailState {
  data: AppDetailData
  isAppDetailLoading: boolean
  error?: string | null
}

export const defaultState: DeveloperState = {
  loading: false,
  developerAppDetail: {
    error: null,
    data: null,
    isAppDetailLoading: false,
  },
  developerData: null,
  formState: 'PENDING',
  isVisible: false,
  myIdentity: null,
  billing: null,
  isServiceChartLoading: true,
  error: null,
}

const developerReducer = (state: DeveloperState = defaultState, action: Action<any>): DeveloperState => {
  if (isType(action, developerFetchAppDetail)) {
    return {
      ...state,
      developerAppDetail: {
        ...state.developerAppDetail,
        isAppDetailLoading: true,
      },
    }
  }

  if (isType(action, developerFetchAppDetailSuccess)) {
    return {
      ...state,
      developerAppDetail: {
        ...state.developerAppDetail,
        data: action.data,
        isAppDetailLoading: false,
      },
    }
  }

  if (isType(action, developerFetchAppDetailFailed)) {
    return {
      ...state,
      developerAppDetail: {
        ...state.developerAppDetail,
        isAppDetailLoading: false,
        error: action.data,
      },
    }
  }

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
