import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { CreateAppRevisionParams } from '@/services/apps'

export const createAppRevision = actionCreator<CreateAppRevisionParams>(ActionTypes.CREATE_APP_REVISION)
export const createAppRevisionSuccess = actionCreator<void>(ActionTypes.CREATE_APP_REVISION_SUCCESS)
export const createAppRevisionFailed = actionCreator<void>(ActionTypes.CREATE_APP_REVISION_FAILED)
