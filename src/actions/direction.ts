import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { AppointmentModel } from '@reapit/foundations-ts-definitions'

export const setDestination = actionCreator<AppointmentModel | null>(ActionTypes.SET_DESTINATION)
