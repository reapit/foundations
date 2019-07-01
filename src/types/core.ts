import Routes from '../constants/routes'
import ActionTypes from '../constants/action-types'
import { HomeState } from '../reducers/home'
import { ItemState } from '../reducers/item'
import { ClientState } from '../reducers/client'
import { MyAppsState } from '../reducers/my-apps'
import { DeveloperState } from '../reducers/developer'
import { AuthState } from '../reducers/auth'
import { ErrorState } from '../reducers/error'

export interface Action<T> {
  readonly type: ActionType
  readonly data: T
}

export interface ActionCreator<T> {
  readonly type: string
  (data: T): Action<T>
}

export type RouteValue = keyof typeof Routes

export type ActionType = keyof typeof ActionTypes

export interface FetcherParams<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  body?: T
}

export interface ReduxState {
  home: HomeState
  item: ItemState
  client: ClientState
  myApps: MyAppsState
  developer: DeveloperState
  auth: AuthState
  error: ErrorState
}
