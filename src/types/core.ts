import Routes from '../constants/routes'
import ActionTypes from '../constants/action-types'
import { HomeState } from '../reducers/home'
import { ItemState } from '../reducers/item'

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
}

// export type ReduxDispatch = ThunkDispatch<ReduxState, void, Action<any>>
