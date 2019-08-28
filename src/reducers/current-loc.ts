import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { setCurrentLoc } from '@/actions/current-loc'

export type CurrentLocState = Position | null
export const defaultState: CurrentLocState = null

export const currentLocReducer = (state: CurrentLocState = defaultState, action: Action<any>): CurrentLocState => {
  if (isType(action, setCurrentLoc)) {
    return action.data
  }

  return state
}

export default currentLocReducer
