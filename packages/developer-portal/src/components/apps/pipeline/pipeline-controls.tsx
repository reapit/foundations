import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { BodyText, Button, ButtonGroup, Subtitle, elMb3, elFadeIn, Icon, SmallText, useModal } from '@reapit/elements'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { UpdateReturnTypeEnum, useReapitUpdate } from '@reapit/utils-react'
import { useAppState } from '../state/use-app-state'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { navigate, openNewPage } from '../../../utils/navigation'
import { useHistory, useLocation } from 'react-router'
import Routes from '../../../constants/routes'

export const handlePipelineRunnerSuccess =
  (setAppPipelineDeploying: Dispatch<SetStateAction<boolean>>, updatePipelineRunnerSuccess?: boolean) => () => {
    if (updatePipelineRunnerSuccess) {
      setAppPipelineDeploying(true)
    }
  }

export const PipelineControls: FC = () => {
  const location = useLocation()
  const history = useHistory()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appPipelineState, appId } = useAppState()
  const { Modal, openModal, closeModal } = useModal()
  const { appPipeline, setAppPipeline, setAppPipelineSaving, setAppPipelineDeploying } = appPipelineState
  const { pathname } = location
  const isConfigPage = pathname.includes('new') || pathname.includes('configure')

  const [deleteLoading, , deleteFunc] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.deletePipeline],
    uriParams: {
      appId: appPipeline?.id,
    },
    method: 'DELETE',
    headers: {
      Authorization: connectSession?.idToken as string,
    },
  })

  const [pipelineRunnerLoading, updatePipelineRunnerSuccess, updatePipelineRunner] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createPipelineDeployment],
    uriParams: {
      pipelineId: appPipeline?.id,
    },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    returnType: UpdateReturnTypeEnum.RESPONSE,
  })

  const [pipelineUpdateLoading, , sendPipelineUpdate] = useReapitUpdate<PipelineModelInterface, PipelineModelInterface>(
    {
      reapitConnectBrowserSession,
      method: 'PUT',
      action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.updatePipeline],
      uriParams: {
        pipelineId: appPipeline?.id,
      },
      headers: {
        Authorization: connectSession?.idToken as string,
      },
      returnType: UpdateReturnTypeEnum.RESPONSE,
    },
  )

  useEffect(handlePipelineRunnerSuccess(setAppPipelineDeploying, updatePipelineRunnerSuccess), [
    updatePipelineRunnerSuccess,
  ])

  const isLoading =
    pipelineUpdateLoading ||
    appPipeline?.buildStatus === 'PROVISIONING' ||
    appPipeline?.buildStatus === 'PROVISION_REQUEST'

  return (
    <div className={elFadeIn}>
      <Icon className={elMb3} icon="webDeveloperInfographic" iconSize="large" />
      <Subtitle>Pipeline</Subtitle>
      {isConfigPage ? (
        <SmallText hasGreyText>
          When you create an app, we create a pre-provisioned pipeline for your app. You should configure your build
          steps on this page before using the deployments page to manage your releases to our infra.
        </SmallText>
      ) : appPipeline ? (
        <SmallText hasGreyText>
          When you have a pipeline for your application, you can manage deployments from this page. Each table row
          refers to a deployment, and by expading the content, you can follow progress in real time.
        </SmallText>
      ) : (
        <SmallText hasGreyText>
          To get started with Reapit IAAS pipelines, first take the time to read the documentation. Then visit this page
          to configure your first pipeline.
        </SmallText>
      )}
      {isConfigPage && (
        <Button
          className={elMb3}
          loading={deleteLoading}
          intent="primary"
          disabled={appPipeline?.buildStatus === 'DELETING'}
          onClick={async (event) => {
            event.preventDefault()
            setAppPipelineSaving(true)
          }}
        >
          Save Config
        </Button>
      )}
      {['PRE_PROVISIONED', 'PROVISIONING', 'PROVISION_REQUEST', 'FAILED_TO_PROVISION'].includes(
        appPipeline?.buildStatus as string,
      ) ? (
        <Button
          className={elMb3}
          onClick={async (event) => {
            event.preventDefault()
            await sendPipelineUpdate({
              ...(appPipeline ?? {}),
              buildStatus: 'PROVISION_REQUEST',
            })
          }}
          disabled={isLoading}
          loading={isLoading}
          intent="success"
        >
          Provision
        </Button>
      ) : appPipeline ? (
        <>
          <Button
            className={elMb3}
            loading={pipelineRunnerLoading}
            intent="primary"
            onClick={async (event) => {
              event.preventDefault()
              await updatePipelineRunner()
            }}
            disabled={appPipeline?.buildStatus === 'DELETING' || appPipeline?.buildStatus === 'SCHEDULED_FOR_DELETION'}
          >
            Deploy
          </Button>
          <Button
            className={elMb3}
            intent="secondary"
            onClick={openNewPage('https://github.com/reapit/foundations/tree/master/packages/cli#readme')}
          >
            Deploy CLI
          </Button>
        </>
      ) : null}
      {appPipeline && !isConfigPage && (
        <Button
          className={elMb3}
          loading={deleteLoading}
          intent="secondary"
          disabled={appPipeline?.buildStatus === 'DELETING'}
          onClick={navigate(history, Routes.APP_PIPELINE_CONFIGURE.replace(':appId', appId as string))}
        >
          Configure
        </Button>
      )}
      {appPipeline && (
        <Button
          className={elMb3}
          loading={deleteLoading}
          intent="neutral"
          disabled={appPipeline?.buildStatus === 'DELETING'}
          onClick={openModal}
        >
          Delete Pipeline
        </Button>
      )}
      <Modal title="Delete Pipeline">
        <BodyText hasGreyText>
          Are you sure you want to delete this pipeline? This will tear down any infrastructure you have provisioned and
          cannout be recovered,
        </BodyText>
        <ButtonGroup alignment="center">
          <Button intent="low" onClick={closeModal}>
            Close
          </Button>
          <Button
            intent="danger"
            onClick={async (event) => {
              event.preventDefault()
              const result = await deleteFunc()

              if (result) {
                setAppPipeline(null)
                closeModal()
              }
            }}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Modal>
    </div>
  )
}
