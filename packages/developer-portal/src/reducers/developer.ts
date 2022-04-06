import { Action, FormState } from '../types/core'
import { isType } from '../utils/actions'
import { developerSetFormState, setMyIdentity, developerSetWebhookPingStatus } from '@/actions/developer'
import { DeveloperModel, AppDetailModel } from '@reapit/foundations-ts-definitions'
import { developerAppShowModal } from '@/actions/developer-app-modal'

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

export type WebhookPingTestStatus = 'SUCCESS' | 'FAILED' | 'LOADING' | null

export interface DeveloperState {
  loading: boolean
  formState: FormState
  isVisible: boolean
  myIdentity: DeveloperModel | null
  isServiceChartLoading: boolean
  error: unknown
  webhookPingTestStatus: WebhookPingTestStatus
}

export type AppDetailData = (AppDetailModel & { apiKey?: string }) | null

export const defaultState: DeveloperState = {
  loading: false,
  formState: 'PENDING',
  isVisible: false,
  myIdentity: null,
  isServiceChartLoading: false,
  error: null,
  webhookPingTestStatus: null,
}

const developerReducer = (state: DeveloperState = defaultState, action: Action<any>): DeveloperState => {
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

  if (isType(action, developerSetWebhookPingStatus)) {
    return {
      ...state,
      webhookPingTestStatus: (action as any).data,
    }
  }

  return state
}

export default developerReducer
