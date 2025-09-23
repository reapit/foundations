import React, { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'
import ErrorBoundary from '../../../core/error-boundary'
import { useAppState } from '../state/use-app-state'
import { useEvent } from '@harelpls/use-pusher'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'

export interface PipelinePusherEvent {
  pipeline: PipelineModelInterface & { runtime: string }
}

export const handlePipelineEvent =
  (
    pipeline: (PipelineModelInterface & { runtime: string }) | null,
    setPipeline: Dispatch<SetStateAction<(PipelineModelInterface & { runtime: string }) | null>>,
    appId: string | null,
  ) =>
  (event?: PipelineModelInterface & { runtime: string }) => {
    const pipelineId = pipeline?.id || appId
    if (!event || !pipelineId || event?.id !== pipelineId) {
      return
    }

    setPipeline(event)
  }

export const handleRunnerEvent =
  (
    pipeline: (PipelineModelInterface & { runtime: string }) | null,
    setPipeline: Dispatch<SetStateAction<(PipelineModelInterface & { runtime: string }) | null>>,
    appId: string | null,
  ) =>
  (event?: PipelinePusherEvent) => {
    const pipelineId = pipeline?.id || appId
    if (!event || !pipelineId || event.pipeline?.id !== pipelineId) {
      return
    }

    setPipeline(event.pipeline)
  }

export const PusherEventWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { appId, appPipelineState } = useAppState()
  const { appPipeline, setAppPipeline, appPipelinePusherChannel } = appPipelineState

  useEvent(appPipelinePusherChannel, 'pipeline-update', handlePipelineEvent(appPipeline, setAppPipeline, appId))
  useEvent(appPipelinePusherChannel, 'pipeline-runner-update', handleRunnerEvent(appPipeline, setAppPipeline, appId))

  return <ErrorBoundary>{children}</ErrorBoundary>
}
