import React, { FC } from 'react'
import { PipelinesAbout } from './pipelines-about'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { Loader, PersistantNotification, Title } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { useAppState } from '../state/use-app-state'
import { PipelineInfo } from './pipeline-info'

export const PipelinePage: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appsDataState, appPipelineState } = useAppState()

  const { appDetail, appDetailLoading } = appsDataState
  const { appPipeline, appPipelineLoading } = appPipelineState

  return (
    <>
      {!appDetailLoading && appDetail && <Title>Pipeline Deployments</Title>}
      {appPipelineLoading || !connectSession || appDetailLoading ? (
        <Loader />
      ) : !appPipeline && appDetail ? (
        <PipelinesAbout />
      ) : appPipeline && appDetail ? (
        <PipelineInfo />
      ) : (
        <PersistantNotification intent="secondary" isExpanded isFullWidth isInline>
          No record of this app found, please select an app from the My Apps page.
        </PersistantNotification>
      )}
    </>
  )
}
