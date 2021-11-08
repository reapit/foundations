import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { CreateAppParams } from '@/services/apps'

export const createAppPipeline = actionCreator<CreateAppParams>(ActionTypes.CREATE_APP_PIPELINE)
export const createAppPipelineSuccess = actionCreator<void>(ActionTypes.CREATE_APP_PIPELINE_SUCCESS)
export const createAppPipelineFailed = actionCreator<void>(ActionTypes.CREATE_APP_PIPELINE_FAILED)
