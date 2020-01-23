import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { ExtendedAppointmentModel } from '@/types/core'
import { setDestination } from '@/actions/direction'

export type DirectionState = {
  destination: ExtendedAppointmentModel | null
}

export const defaultState: DirectionState = {
  destination: null,
}

export const directionReducer = (
  state: DirectionState = defaultState,
  action: Action<ExtendedAppointmentModel | null>,
): DirectionState => {
  if (isType(action, setDestination)) {
    return {
      ...state,
      destination: action.data,
    }
  }

  return state
}

export default directionReducer
