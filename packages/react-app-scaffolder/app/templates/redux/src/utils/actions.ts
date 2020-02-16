import { ActionCreator, Action, RouteValue } from '../types/core'

export const actionCreator = <T>(type: string): ActionCreator<T> =>
  Object.assign((data: T): any => ({ type, data }), { type })

/* This is a type guard used to strongly type reducers see: https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#user-defined-type-guard-functions
 * you will note the value
 * FYI, does NOT work if reducer is a switch statement - TS not smart enough to infer type of data
 * hence use of conditionals in reducers
 */
export const isType = <T>(action: Action<any>, actionCreator: ActionCreator<T>): action is Action<T> =>
  action.type === actionCreator.type
