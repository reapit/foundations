import React, { FC } from 'react'
import { PipelinesAbout } from './pipelines-about'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import {
  Button,
  ButtonGroup,
  FlexContainer,
  Loader,
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
import { ApiKeys } from './pipeline-api-keys'

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
    : pathname.includes('api-keys')
    ? 'apiKeys'
    : 'deployments'

  return (
    <>
      <FlexContainer isFlexJustifyBetween>
        <Title>App Pipeline</Title>
        {isMobile && (
          <ButtonGroup alignment="right">
            <Button intent="low" onClick={openModal}>
              Controls
            </Button>
          </ButtonGroup>
        )}
      </FlexContainer>
      {isMobile && (
        <Modal title="Controls">
          <Helper />
          <ButtonGroup alignment="center">
            <Button fixedWidth intent="secondary" onClick={closeModal}>
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
          ) : tab === 'apiKeys' ? (
            <ApiKeys />
          ) : (
            <PipelineEnvironment />
          )}
        </>
      ) : (
        <PersistentNotification intent="secondary" isExpanded isFullWidth isInline>
          No record of this app found, please select an app from the My Apps page.
        </PersistentNotification>
      )}
    </>
  )
}
