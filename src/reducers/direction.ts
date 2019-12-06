import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { AppointmentModel } from '@/types/platform'
import { setDestination } from '@/actions/direction'

export type DirectionState = {
  destination: AppointmentModel | null
}

export const defaultState: DirectionState = {
  destination: null
}

export const directionReducer = (
  state: DirectionState = defaultState,
  action: Action<AppointmentModel | null>
): DirectionState => {
  if (isType(action, setDestination)) {
    return {
      ...state,
      destination: action.data
    }
  }

  return state
}

export default directionReducer
