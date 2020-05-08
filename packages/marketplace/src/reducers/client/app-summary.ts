import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  clientAppSummaryRequestData,
  clientAppSummaryReceiveData,
  clientAppSummaryClearData,
  clientAppSummaryRequestDataFailure,
} from '@/actions/client'
import { PagedResultAppSummaryModel_, AppSummaryModel } from '@reapit/foundations-ts-definitions'

export interface ClientAppSummary {
  apps: PagedResultAppSummaryModel_
  featuredApps?: AppSummaryModel[]
}

export interface ClientAppSummaryParams {
  page?: number
  search?: string
  searchBy?: string
  category?: string
}

export interface ClientAppSummaryState {
  isAppSummaryLoading: boolean
  data: ClientAppSummary | null
  error?: string | null
}

export const defaultState: ClientAppSummaryState = {
  isAppSummaryLoading: false,
  data: null,
  error: null,
}

const clientReducer = (state: ClientAppSummaryState = defaultState, action: Action<any>): ClientAppSummaryState => {
  if (isType(action, clientAppSummaryRequestData)) {
    return {
      ...state,
      isAppSummaryLoading: true,
    }
  }

  if (isType(action, clientAppSummaryReceiveData)) {
    return {
      ...state,
      isAppSummaryLoading: false,
      data: action.data || null,
    }
  }

  if (isType(action, clientAppSummaryClearData)) {
    return {
      ...state,
      isAppSummaryLoading: false,
      data: null,
    }
  }

  if (isType(action, clientAppSummaryRequestDataFailure)) {
    return {
      ...state,
      isAppSummaryLoading: false,
      error: action.data,
    }
  }

  return state
}

export default clientReducer
