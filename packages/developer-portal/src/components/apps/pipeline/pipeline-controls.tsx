import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { BodyText, Button, ButtonGroup, Subtitle, elMb3, elFadeIn, Icon, SmallText, useModal } from '@reapit/elements'
import { httpsUrlRegex } from '@reapit/utils-common'
import {
  SendFunction,
  UpdateReturnTypeEnum,
  useReapitUpdate,
  UpdateActionNames,
  updateActions,
} from '@reapit/use-reapit-data'
import { useAppState } from '../state/use-app-state'
import {
  Marketplace,
  pipelineDeploymentDisabled,
  PipelineModelInterface,
  pipelineNotDeletable,
  pipelinePreprovisionedFlow,
  pipelineProvisioning,
} from '@reapit/foundations-ts-definitions'
import { ExternalPages, navigateRoute, openNewPage } from '../../../utils/navigation'
import { useNavigate, useLocation } from 'react-router'
import { object, string } from 'yup'
import { yarnNpmTest } from '../../../utils/yup'
import Routes from '../../../constants/routes'

export const validateConfig = (appPipeline: PipelineModelInterface | null) => {
  if (!appPipeline) return false

  try {
    object()
      .shape({
        name: string().required(),
        branch: string().required(),
        repository: object().shape({
          repositoryUrl: string().trim().required().matches(httpsUrlRegex),
        }),
        buildCommand: string().trim().required(),
        packageManager: string().trim().required().test(yarnNpmTest),
        outDir: string().required(),
      })
      .validateSync(appPipeline)

    return true
  } catch (err) {
    return false
  }
}

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
    appsDetailRefresh: () => void,
    appRefreshRevisions: () => void,
    appDetail: Marketplace.AppDetailModel | null,
    developerId: string | null,
    pipelineUpdate: PipelineModelInterface,
  ) =>
  async () => {
    const savedPipeline = await sendPipelineUpdate(pipelineUpdate)
    if (appDetail && savedPipeline && typeof savedPipeline !== 'boolean' && savedPipeline.subDomain && developerId) {
      appsDetailRefresh()
      appRefreshRevisions()
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
  const navigate = useNavigate()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appPipelineState, appId, appsDataState } = useAppState()
  const { Modal, openModal, closeModal } = useModal()
  const { appPipeline, setAppPipelineSaving, setAppPipelineDeploying } = appPipelineState
  const { pathname } = location
  const isConfigPage = pathname.includes('new') || pathname.includes('configure')
  const isEnvironmentPage = pathname.includes('environment')
  const isDnsPage = pathname.includes('dns')
  const { appDetail, appsDetailRefresh, appRefreshRevisions } = appsDataState
  const developerId = connectSession?.loginIdentity.developerId ?? null
  const isValidPipeline = validateConfig(appPipeline)
  const hasGithubApp = Boolean(appPipeline?.repository?.installationId)
  const hasBitbucketApp = Boolean(appPipeline?.bitbucketClientId)
  const hasAppInstalled = hasGithubApp || hasBitbucketApp

  const [deleteLoading, , deleteFunc] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.deletePipeline],
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
    action: updateActions[UpdateActionNames.createPipelineDeployment],
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
    action: updateActions[UpdateActionNames.updatePipeline],
    uriParams: {
      pipelineId: appPipeline?.id,
    },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    returnType: UpdateReturnTypeEnum.RESPONSE,
  })

  const [, , createAppRevision] = useReapitUpdate<Marketplace.CreateAppRevisionModel, Marketplace.AppDetailModel>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.createAppRevsion],
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
        <SmallText tag="div" hasGreyText>
          When you create an app, a pipeline is pre-provisioned. You should configure your build steps on this page
          before using the deployments page to manage your releases to our infrastructure.
        </SmallText>
      ) : isEnvironmentPage ? (
        <SmallText tag="div" hasGreyText>
          You may need to set up environment variables for your application. These are key-value pairs that will be
          injected into your application at build time. You can set up environment variables for your application on
          this page.
        </SmallText>
      ) : isDnsPage ? (
        <SmallText tag="div" hasGreyText>
          Configure a custom domain for your application from this page. You will need to setup CNAME records in your
          DNS database which will be presented here.
        </SmallText>
      ) : appPipeline ? (
        <SmallText tag="div" hasGreyText>
          When you have a pipeline for your application, you can manage deployments from this page. Each table row
          refers to a deployment. By expanding the content, you can follow progress in real time and download logs.
        </SmallText>
      ) : (
        <SmallText tag="div" hasGreyText>
          To get started with Reapit IaaS pipelines, first take the time to read the documentation, then visit this page
          to configure your first pipeline.
        </SmallText>
      )}
      <ButtonGroup>
        {isConfigPage && (
          <Button loading={deleteLoading} intent="primary" onClick={handleSaveConfig(setAppPipelineSaving)}>
            Save Config
          </Button>
        )}
        {pipelinePreprovisionedFlow.includes(appPipeline?.buildStatus as string) ? (
          <Button
            onClick={handleSavePipeline(
              sendPipelineUpdate,
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
        ) : appPipeline && !isConfigPage && isValidPipeline && !isDnsPage && !isEnvironmentPage ? (
          <>
            <Button
              loading={pipelineRunnerLoading || appPipeline.buildStatus === 'IN_PROGRESS'}
              intent="primary"
              onClick={handleUpdatePipelineRunner(updatePipelineRunner)}
              disabled={
                pipelineDeploymentDisabled.includes(appPipeline.buildStatus as string) ||
                pipelineNotDeletable.includes(appPipeline.buildStatus as string) ||
                appPipeline.buildStatus === 'QUEUED' ||
                !hasAppInstalled
              }
            >
              Deploy
            </Button>
          </>
        ) : appPipeline && !isValidPipeline && !pathname.includes('configure') ? (
          <Button intent="primary" onClick={navigateRoute(navigate, `${Routes.APPS}/${appId}/pipeline/configure`)}>
            Configure
          </Button>
        ) : null}
        {appPipeline && !isConfigPage && !isDnsPage && !isEnvironmentPage && (
          <Button
            loading={deleteLoading}
            intent="danger"
            disabled={pipelineNotDeletable.includes(appPipeline.buildStatus as string)}
            onClick={openModal}
          >
            Delete Pipeline
          </Button>
        )}
        <Button intent="default" onClick={openNewPage(ExternalPages.iaasDocs)}>
          View Docs
        </Button>
      </ButtonGroup>
      <Modal title="Delete Pipeline">
        <BodyText hasGreyText>
          Are you sure you want to delete this pipeline? This will tear down any infrastructure you have provisioned and
          cannot be recovered.
        </BodyText>
        <ButtonGroup alignment="right">
          <Button intent="default" onClick={closeModal}>
            Close
          </Button>
          <Button intent="danger" onClick={handleDeletePipeline(deleteFunc, closeModal)}>
            Delete
          </Button>
        </ButtonGroup>
      </Modal>
    </div>
  )
}
