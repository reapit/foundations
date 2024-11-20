import React, { FC } from 'react'
import { PipelinesAbout } from './pipelines-about'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import {
  Button,
  ButtonGroup,
  Loader,
  MobileControls,
  PersistentNotification,
  Title,
  useMediaQuery,
  useModal,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { useAppState } from '../state/use-app-state'
import { PipelineInfo } from './pipeline-info'
import { useLocation } from 'react-router'
import { PipelineConfigure } from './pipeline-configure'
import { Helper } from '../page/helper'
import { PipelineTabs } from './pipeline-tabs'
import { PipelineEnvironment } from './pipeline-environment'
import { PipelineDns } from './dns'

export const PipelinePage: FC = () => {
  const location = useLocation()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appsDataState, appPipelineState } = useAppState()
  const { isMobile } = useMediaQuery()
  const { Modal, openModal, closeModal } = useModal()
  const { pathname } = location
  const { appDetail, appDetailLoading } = appsDataState
  const { appPipeline, appPipelineLoading } = appPipelineState

  const tab: PipelineTabs = pathname.includes('configure')
    ? 'configure'
    : pathname.includes('environment')
      ? 'environment'
      : pathname.includes('dns')
        ? 'DNS'
        : 'deployments'

  return (
    <>
      <Title>App Pipeline</Title>
      {isMobile && (
        <Modal title="Controls">
          <Helper />
          <ButtonGroup alignment="right">
            <Button intent="default" onClick={closeModal}>
              Close
            </Button>
          </ButtonGroup>
        </Modal>
      )}
      {appPipelineLoading || !connectSession || appDetailLoading ? (
        <Loader />
      ) : !appPipeline && appDetail ? (
        <PipelinesAbout />
      ) : appPipeline && appDetail ? (
        <>
          {tab === 'configure' ? (
            <PipelineConfigure />
          ) : tab === 'deployments' ? (
            <PipelineInfo />
          ) : tab === 'environment' ? (
            <PipelineEnvironment />
          ) : (
            <PipelineDns />
          )}
        </>
      ) : (
        <PersistentNotification intent="primary" isExpanded isFullWidth isInline>
          No record of this app found, please select an app from the My Apps page.
        </PersistentNotification>
      )}
      <MobileControls onClick={openModal} />
    </>
  )
}
