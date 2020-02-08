import Routes from '../constants/routes'
<<<<<<< HEAD
=======
import ActionTypes from '../constants/action-types'
import { ErrorState } from '../reducers/error'
import { HomeState } from '@/reducers/home'
import { AuthState } from '@/reducers/auth'

export interface Action<T> {
  readonly type: ActionType
  readonly data: T
}

export interface ActionCreator<T> {
  readonly type: string
  (data: T): Action<T>
}
>>>>>>> temp

export interface StringMap {
  [key: string]: string
}

export type PartialRecord<K extends keyof any, T> = { [P in K]?: T }

export type RouteValue = keyof typeof Routes

<<<<<<< HEAD
=======
export type ActionType = keyof typeof ActionTypes

>>>>>>> temp
export type FormState = 'PENDING' | 'DONE' | 'SUBMITTING' | 'ERROR' | 'SUCCESS'

export interface FetcherParams<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  api: string
  url: string
  headers: StringMap
  isPrivate?: boolean
  body?: T
}
<<<<<<< HEAD
=======

export interface ReduxState {
  error: ErrorState
  home: HomeState
  auth: AuthState
}
>>>>>>> temp
