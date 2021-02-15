import Routes from '../constants/routes'
import ActionTypes from '../constants/action-types'
import { ErrorState } from '../reducers/error'
import { ResultsState } from '@/reducers/results'
import { AuthState } from '@/reducers/auth'
import { SubmitChecksState } from '@/reducers/submit-checks'
import { ChecklistDetailState } from '@/reducers/checklist-detail'
import { IdentityTypesState } from '@/reducers/identity-types'
import { SuccessState } from '@/reducers/success'

export interface Action<T> {
  readonly type: ActionType
  readonly data: T
}

export interface ActionCreator<T> {
  readonly type: string
  (data: T): Action<T>
}

export interface StringMap {
  [key: string]: string
}

export type PartialRecord<K extends keyof any, T> = { [P in K]?: T }

export type RouteValue = keyof typeof Routes

export type ActionType = keyof typeof ActionTypes

export type FormState = 'PENDING' | 'DONE' | 'SUBMITTING' | 'ERROR' | 'SUCCESS'

export interface FetcherParams<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  api: string
  url: string
  headers: StringMap
  isPrivate?: boolean
  body?: T
}

export interface ReduxState {
  error: ErrorState
  success: SuccessState
  auth: AuthState
  results: ResultsState
  submitChecks: SubmitChecksState
  checklistDetail: ChecklistDetailState
  identityTypes: IdentityTypesState
}
