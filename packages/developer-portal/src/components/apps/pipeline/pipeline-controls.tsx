import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { BodyText, Button, ButtonGroup, Subtitle, elMb3, elFadeIn, Icon, SmallText, useModal } from '@reapit/elements'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { SendFunction, UpdateReturnTypeEnum, useReapitUpdate } from '@reapit/utils-react'
import { useAppState } from '../state/use-app-state'
import {
  AppDetailModel,
  CreateAppRevisionModel,
  pipelineDeploymentDisabled,
  PipelineModelInterface,
  pipelineNotDeletable,
  pipelinePreprovisionedFlow,
  pipelineProvisioning,
} from '@reapit/foundations-ts-definitions'
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
      const redirectUri = `https://${savedPipeline.subDomain}.iaas.paas.reapit.cloud`
      const signoutUri = `https://${savedPipeline.subDomain}.iaas.paas.reapit.cloud/login`

      if (!sanitisedAppDetail?.redirectUris?.includes(redirectUri)) {
        sanitisedAppDetail?.redirectUris?.push()
      }

      if (!sanitisedAppDetail?.signoutUris?.includes(signoutUri)) {
        sanitisedAppDetail?.signoutUris?.push(signoutUri)
      }

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
  (deletePipeline: SendFunction<void, boolean>, closeModal: () => void) => async () => {
    const response = await deletePipeline()
    if (response) {
      closeModal()
    }
  }

export const PipelineControls: FC = () => {
  const location = useLocation()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appPipelineState, appId, appsDataState } = useAppState()
  const { Modal, openModal, closeModal } = useModal()
  const { appPipeline, setAppPipelineSaving, setAppPipelineDeploying } = appPipelineState
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

  const [, , sendPipelineUpdate] = useReapitUpdate<PipelineModelInterface, PipelineModelInterface>({
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
  })

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
          onClick={handleSaveConfig(setAppPipelineSaving)}
        >
          Save Config
        </Button>
      )}
      {pipelinePreprovisionedFlow.includes(appPipeline?.buildStatus as string) ? (
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
          disabled={pipelineProvisioning.includes(appPipeline?.buildStatus as string)}
          loading={pipelineProvisioning.includes(appPipeline?.buildStatus as string)}
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
            disabled={pipelineDeploymentDisabled.includes(appPipeline.buildStatus as string)}
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
          disabled={pipelineNotDeletable.includes(appPipeline.buildStatus as string)}
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
          <Button fixedWidth intent="danger" onClick={handleDeletePipeline(deleteFunc, closeModal)}>
            Delete
          </Button>
        </ButtonGroup>
      </Modal>
    </div>
  )
}
