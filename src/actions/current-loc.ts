import { actionCreator } from '@/utils/actions'
import { CurrentLocState } from '@/reducers/current-loc'
import ActionTypes from '@/constants/action-types'

export const setCurrentLoc = actionCreator<CurrentLocState>(ActionTypes.SET_CURRENT_LOC)
