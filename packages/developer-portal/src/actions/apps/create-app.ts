import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { CreateAppParams } from '@/services/apps'

export const createApp = actionCreator<CreateAppParams>(ActionTypes.CREATE_APP)
export const createAppSuccess = actionCreator<void>(ActionTypes.CREATE_APP_SUCCESS)
export const createAppFailed = actionCreator<void>(ActionTypes.CREATE_APP_FAILED)
