import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { PipelineModelInterface, PipelineRunnerModelInterface } from '@reapit/foundations-ts-definitions'
import {
  fetchAppPipeline,
  fetchAppPipelineFailed,
  fetchAppPipelineRunners,
  fetchAppPipelineRunnersFailed,
  fetchAppPipelineRunnersSuccess,
  fetchAppPipelineSuccess,
  Pagination,
} from '@/actions/apps'

export type AppPipelineData = (PipelineModelInterface & { apiKey?: string }) | null

export interface AppPipelineState {
  data: AppPipelineData
  deployments: {
    result?: Pagination<PipelineRunnerModelInterface>
    deployments: PipelineModelInterface[]
  }
  isLoading: boolean
  errorMessage?: string | null
}

export const defaultState: AppPipelineState = {
  isLoading: false,
  data: null,
  errorMessage: null,
  deployments: {
    result: undefined,
    deployments: [],
  },
}

const appPipelineReducer = (state: AppPipelineState = defaultState, action: Action<any>): AppPipelineState => {
  if (isType(action, fetchAppPipeline)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (isType(action, fetchAppPipelineSuccess)) {
    return {
      ...state,
      isLoading: false,
      data: action.data || null,
    }
  }

  if (isType(action, fetchAppPipelineFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  if (isType(action, fetchAppPipelineRunners)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (isType(action, fetchAppPipelineRunnersSuccess)) {
    const deployments = [...state.deployments.deployments, ...action.data.items]
    const deploymentIds: string[] = []
    return {
      ...state,
      isLoading: false,
      deployments: {
        result: action.data,
        deployments: deployments.reduce<PipelineRunnerModelInterface[]>((items, item) => {
          if (!deploymentIds.includes(item.id as string)) {
            deploymentIds.push(item.id as string)
            items.push(item)
          }
          return items
        }, [] as PipelineModelInterface[]),
      },
    }
  }

  if (isType(action, fetchAppPipelineRunnersFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  return state
}

export default appPipelineReducer
