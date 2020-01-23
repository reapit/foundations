import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { ExtendedAppointmentModel } from '@/types/core'

export const setDestination = actionCreator<ExtendedAppointmentModel | null>(ActionTypes.SET_DESTINATION)
