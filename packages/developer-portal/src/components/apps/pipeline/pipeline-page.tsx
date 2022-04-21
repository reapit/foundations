import React, { FC } from 'react'
import { PipelinesAbout } from './pipelines-about'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { Loader, PersistantNotification, Title } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { useAppState } from '../state/use-app-state'
import { PipelineInfo } from './pipeline-info'
import { useLocation } from 'react-router'
import { PipelineConfigure } from './pipeline-configure'

export const PipelinePage: FC = () => {
  const location = useLocation()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appsDataState, appPipelineState } = useAppState()
  const { pathname } = location
  const { appDetail, appDetailLoading } = appsDataState
  const { appPipeline, appPipelineLoading } = appPipelineState
  const isConfigPage = pathname.includes('configure')

  return (
    <>
      <Title>App Pipeline</Title>
      {appPipelineLoading || !connectSession || appDetailLoading ? (
        <Loader />
      ) : !appPipeline && appDetail ? (
        <PipelinesAbout />
      ) : appPipeline && appDetail ? (
        <>{isConfigPage ? <PipelineConfigure /> : <PipelineInfo />}</>
      ) : (
        <PersistantNotification intent="secondary" isExpanded isFullWidth isInline>
          No record of this app found, please select an app from the My Apps page.
        </PersistantNotification>
      )}
    </>
  )
}
