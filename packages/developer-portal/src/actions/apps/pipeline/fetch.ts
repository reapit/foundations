import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { PipelineModelInterface, PipelineRunnerModelInterface } from '@reapit/foundations-ts-definitions'

const {
  FETCH_APP_PIPELINE,
  FETCH_APP_PIPELINE_SUCCESS,
  FETCH_APP_PIPELINE_FAILED,
  CLEAR_APP_PIPELINE,
  FETCH_APP_PIPELINE_RUNNERS,
  FETCH_APP_PIPELINE_RUNNERS_SUCCESS,
  FETCH_APP_PIPELINE_RUNNERS_FAILED,
  CLEAR_APP_PIPELINE_RUNNERS,
} = ActionTypes

export type Pagination<T> = {
  items: T[]
  count: number
  totalCount: number
}

export const fetchAppPipeline = actionCreator<PipelineModelInterface>(FETCH_APP_PIPELINE)
export const fetchAppPipelineSuccess = actionCreator<PipelineModelInterface>(FETCH_APP_PIPELINE_SUCCESS)
export const fetchAppPipelineFailed = actionCreator<string>(FETCH_APP_PIPELINE_FAILED)
export const clearAppPipeline = actionCreator<void>(CLEAR_APP_PIPELINE)

export const fetchAppPipelineRunners = actionCreator<PipelineRunnerModelInterface>(FETCH_APP_PIPELINE_RUNNERS)
export const fetchAppPipelineRunnersSuccess = actionCreator<Pagination<PipelineRunnerModelInterface>>(
  FETCH_APP_PIPELINE_RUNNERS_SUCCESS,
)
export const fetchAppPipelineRunnersFailed = actionCreator<string>(FETCH_APP_PIPELINE_RUNNERS_FAILED)
export const clearAppPipelineRunners = actionCreator<void>(CLEAR_APP_PIPELINE_RUNNERS)
