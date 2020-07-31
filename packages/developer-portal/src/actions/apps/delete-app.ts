import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { DeleteAppByIdParams } from '@/services/apps'

export const deleteApp = actionCreator<DeleteAppByIdParams>(ActionTypes.DELETE_APP)
export const deleteAppSuccess = actionCreator<void>(ActionTypes.DELETE_APP_SUCCESS)
export const deleteAppFailed = actionCreator<void>(ActionTypes.DELETE_APP_FAILED)
