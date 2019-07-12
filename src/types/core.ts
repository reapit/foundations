import Routes from '../constants/routes'
import ActionTypes from '../constants/action-types'
import { ClientState } from '../reducers/client'
import { MyAppsState } from '../reducers/my-apps'
import { DeveloperState } from '../reducers/developer'
import { AuthState } from '../reducers/auth'
import { AppDetailState } from '../reducers/app-detail'
import { ErrorState } from '../reducers/error'

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

export type RouteValue = keyof typeof Routes

export type ActionType = keyof typeof ActionTypes

export type FormState = 'PENDING' | 'DONE' | 'SUBMITTING' | 'ERROR' | 'SUCCESS'

export interface FetcherParams<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  body?: T
  headers: StringMap
}

export interface ReduxState {
  client: ClientState
  myApps: MyAppsState
  appDetail: AppDetailState
  developer: DeveloperState
  auth: AuthState
  error: ErrorState
}
