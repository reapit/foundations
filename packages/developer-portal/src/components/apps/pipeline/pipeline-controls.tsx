import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { BodyText, Button, ButtonGroup, Subtitle, elMb3, elFadeIn, Icon, SmallText, useModal } from '@reapit/elements'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { SendFunction, UpdateReturnTypeEnum, useReapitUpdate } from '@reapit/utils-react'
import { useAppState } from '../state/use-app-state'
import { AppDetailModel, CreateAppRevisionModel, PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { openNewPage } from '../../../utils/navigation'
import { useLocation } from 'react-router'
import { ApiKeys } from './pipeline-api-keys'
import { formatFormValues } from '../utils/format-form-values'
import { formatAppFields } from '../utils/handle-default-form-values'
import { AppEditFormSchema } from '../edit/form-schema/form-fields'

export const handlePipelineRunnerSuccess =
  (setAppPipelineDeploying: Dispatch<SetStateAction<boolean>>, updatePipelineRunnerSuccess?: boolean) => () => {
    if (updatePipelineRunnerSuccess) {
      setAppPipelineDeploying(true)
    }
  }

export const handleSaveConfig = (setAppPipelineSaving: Dispatch<SetStateAction<boolean>>) => () => {
  setAppPipelineSaving(true)
}

export const handleSavePipeline =
  (
    sendPipelineUpdate: SendFunction<PipelineModelInterface, boolean | PipelineModelInterface>,
    createAppRevision: SendFunction<CreateAppRevisionModel, boolean | AppDetailModel>,
    appsDetailRefresh: () => void,
    appRefreshRevisions: () => void,
    appDetail: AppDetailModel | null,
    developerId: string | null,
    pipelineUpdate: PipelineModelInterface,
  ) =>
  async () => {
    const savedPipeline = await sendPipelineUpdate(pipelineUpdate)
    if (appDetail && savedPipeline && typeof savedPipeline !== 'boolean' && savedPipeline.subDomain && developerId) {
      const formattedFields = formatAppFields(appDetail, developerId)
      const sanitisedAppDetail = formatFormValues(formattedFields as AppEditFormSchema)

      sanitisedAppDetail?.redirectUris?.push(`https://${savedPipeline.subDomain}.iaas.paas.reapit.cloud`)
      sanitisedAppDetail?.signoutUris?.push(`https://${savedPipeline.subDomain}.iaas.paas.reapit.cloud/login`)

      const appRevsion = await createAppRevision(sanitisedAppDetail)
      if (appRevsion) {
        appsDetailRefresh()
        appRefreshRevisions()
      }
    }
  }

export const handleUpdatePipelineRunner = (updatePipelineRunner: SendFunction<void, boolean>) => () => {
  updatePipelineRunner()
}

export const handleDeletePipeline =
  (
    deletePipeline: SendFunction<void, boolean>,
    setAppPipeline: Dispatch<SetStateAction<PipelineModelInterface | null>>,
    closeModal: () => void,
  ) =>
  async () => {
    const response = await deletePipeline()
    if (response) {
      setAppPipeline(null)
      closeModal()
    }
  }

export const PipelineControls: FC = () => {
  const location = useLocation()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appPipelineState, appId, appsDataState } = useAppState()
  const { Modal, openModal, closeModal } = useModal()
  const { appPipeline, setAppPipeline, setAppPipelineSaving, setAppPipelineDeploying } = appPipelineState
  const { pathname } = location
  const isConfigPage = pathname.includes('new') || pathname.includes('configure')
  const { appDetail, appsDetailRefresh, appRefreshRevisions } = appsDataState
  const developerId = connectSession?.loginIdentity.developerId ?? null

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

  const [, , createAppRevision] = useReapitUpdate<CreateAppRevisionModel, AppDetailModel>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createAppRevsion],
    method: 'POST',
    uriParams: {
      appId,
    },
    returnType: UpdateReturnTypeEnum.LOCATION,
  })

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
          onClick={handleSaveConfig(setAppPipelineSaving)}
        >
          Save Config
        </Button>
      )}
      {['PRE_PROVISIONED', 'PROVISIONING', 'PROVISION_REQUEST', 'FAILED_TO_PROVISION'].includes(
        appPipeline?.buildStatus as string,
      ) ? (
        <Button
          className={elMb3}
          onClick={handleSavePipeline(
            sendPipelineUpdate,
            createAppRevision,
            appsDetailRefresh,
            appRefreshRevisions,
            appDetail,
            developerId,
            {
              ...(appPipeline ?? {}),
              buildStatus: 'PROVISION_REQUEST',
            },
          )}
          disabled={isLoading}
          loading={isLoading}
          intent="primary"
        >
          Provision
        </Button>
      ) : appPipeline && !isConfigPage ? (
        <>
          <Button
            className={elMb3}
            loading={pipelineRunnerLoading}
            intent="primary"
            onClick={handleUpdatePipelineRunner(updatePipelineRunner)}
            disabled={appPipeline.buildStatus === 'DELETING' || appPipeline.buildStatus === 'SCHEDULED_FOR_DELETION'}
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
          <ApiKeys />
        </>
      ) : null}
      {appPipeline && (
        <Button
          className={elMb3}
          loading={deleteLoading}
          intent="neutral"
          disabled={appPipeline.buildStatus === 'DELETING'}
          onClick={openModal}
        >
          Delete Pipeline
        </Button>
      )}
      <Modal title="Delete Pipeline">
        <BodyText hasGreyText>
          Are you sure you want to delete this pipeline? This will tear down any infrastructure you have provisioned and
          cannot be recovered.
        </BodyText>
        <ButtonGroup alignment="center">
          <Button fixedWidth intent="low" onClick={closeModal}>
            Close
          </Button>
          <Button fixedWidth intent="danger" onClick={handleDeletePipeline(deleteFunc, setAppPipeline, closeModal)}>
            Delete
          </Button>
        </ButtonGroup>
      </Modal>
    </div>
  )
}
