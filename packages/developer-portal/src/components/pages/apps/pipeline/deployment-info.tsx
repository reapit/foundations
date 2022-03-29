import { cx } from '@linaria/core'
import { useReapitConnect } from '@reapit/connect-session'
import { Button, ButtonGroup, elMb6, Title } from '@reapit/elements'
import { PipelineModelInterface, PipelineRunnerModelInterface } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { openNewPage } from '@/utils/navigation'
import { UpdateReturnTypeEnum } from '@reapit/utils-react'
import { PipelineDeploymentTable } from './pipeline-runner-table'
import { PipelineInfo } from './pipeline-info'
import { useEvent } from '@harelpls/use-pusher'

export interface PipelineDeploymentInfoProps {
  pipeline: PipelineModelInterface
  setPipeline: (pipeline: PipelineModelInterface) => void
  channel: any
}

export type PipelineRunnerMeta = {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export const PipelineDeploymentInfo: FC<PipelineDeploymentInfoProps> = ({ pipeline, channel, setPipeline }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [page, setPage] = React.useState(1)
  const [pipelineDeployments, loading] = useReapitGet<{
    items: PipelineRunnerModelInterface[]
    meta: PipelineRunnerMeta
  }>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getPipelineDeployments],
    uriParams: {
      pipelineId: pipeline.id,
    },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    fetchWhenTrue: [connectSession?.idToken],
    queryParams: {
      page,
    },
  })
  const [deploymentLoading, pipelineRunner, sendFunc] = useReapitUpdate<void, PipelineRunnerModelInterface>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createPipelineDeployment],
    uriParams: {
      pipelineId: pipeline.id,
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
        pipelineId: pipeline.id,
      },
      headers: {
        Authorization: connectSession?.idToken as string,
      },
      returnType: UpdateReturnTypeEnum.RESPONSE,
    },
  )

  useEvent<PipelineRunnerModelInterface & { pipeline: PipelineModelInterface }>(channel, 'pipeline-update', (event) => {
    if (!event) {
      return
    }

    setPipeline(event)
  })

  return (
    <>
      <PipelineInfo pipeline={pipeline} setPipeline={setPipeline} />
      <Title>Deployments</Title>
      <ButtonGroup className={cx(elMb6)}>
        {['PRE_PROVISIONED', 'PROVISIONING', 'PROVISION_REQUEST', 'FAILED_TO_PROVISION'].includes(
          pipeline.buildStatus as string,
        ) ? (
          <Button
            onClick={async (event) => {
              event.preventDefault()
              await sendPipelineUpdate({
                ...pipeline,
                buildStatus: 'PROVISION_REQUEST',
              })
            }}
            disabled={
              pipelineUpdateLoading ||
              pipeline.buildStatus === 'PROVISIONING' ||
              pipeline.buildStatus === 'PROVISION_REQUEST'
            }
            loading={
              pipelineUpdateLoading ||
              pipeline.buildStatus === 'PROVISIONING' ||
              pipeline.buildStatus === 'PROVISION_REQUEST'
            }
            intent="success"
          >
            Provision
          </Button>
        ) : (
          <Button
            loading={deploymentLoading}
            intent="primary"
            onClick={async (event) => {
              event.preventDefault()
              await sendFunc()
            }}
            disabled={pipeline.buildStatus === 'DELETING' || pipeline.buildStatus === 'SCHEDULED_FOR_DELETION'}
          >
            Deploy
          </Button>
        )}
        <Button
          intent="critical"
          onClick={openNewPage('https://github.com/reapit/foundations/tree/master/packages/cli#readme')}
        >
          Deploy With Cli
        </Button>
      </ButtonGroup>
      <PipelineDeploymentTable
        pipeline={pipeline}
        initialDeployments={pipelineDeployments}
        newRunner={pipelineRunner}
        loading={loading}
        channel={channel}
        setPage={setPage}
      />
    </>
  )
}
