import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import {
  clientFetchAppSummary,
  clientFetchAppSummarySuccess,
  clientClearAppSummary,
  clientFetchAppSummaryFailed,
} from '@/actions/client'
import { PagedResultAppSummaryModel_, AppSummaryModel } from '@reapit/foundations-ts-definitions'

export interface ClientAppSummary {
  apps: PagedResultAppSummaryModel_
  featuredApps: AppSummaryModel[] | null
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

const appSummaryReducer = (state: ClientAppSummaryState = defaultState, action: Action<any>): ClientAppSummaryState => {
  if (isType(action, clientFetchAppSummary)) {
    return {
      ...state,
      isAppSummaryLoading: true,
    }
  }

  if (isType(action, clientFetchAppSummarySuccess)) {
    return {
      ...state,
      isAppSummaryLoading: false,
      data: {
        apps: {
          ...state?.data?.apps,
          ...action.data?.apps,
          data: [...(state?.data?.apps.data || []), ...(action.data?.apps.data || [])],
        },
        featuredApps: action?.data?.featuredApps || null,
      },
    }
  }

  if (isType(action, clientClearAppSummary)) {
    return {
      ...state,
      isAppSummaryLoading: false,
      data: null,
    }
  }

  if (isType(action, clientFetchAppSummaryFailed)) {
    return {
      ...state,
      isAppSummaryLoading: false,
      error: action.data,
    }
  }

  return state
}

export default appSummaryReducer
