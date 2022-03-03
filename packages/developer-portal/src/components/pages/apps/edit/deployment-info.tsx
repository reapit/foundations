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

export interface PipelineDeploymentInfoProps {
  pipeline: PipelineModelInterface
  setPipeline: (pipeline: PipelineModelInterface) => void
  channel: any
}

export const PipelineDeploymentInfo: FC<PipelineDeploymentInfoProps> = ({ pipeline, channel, setPipeline }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [pipelineDeployments, loading] = useReapitGet<{ items: PipelineRunnerModelInterface[] }>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getPipelineDeployments],
    uriParams: {
      pipelineId: pipeline.id,
    },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    fetchWhenTrue: [connectSession?.idToken],
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

  const [deleteLoading, , deleteFunc] = useReapitUpdate<void, PipelineRunnerModelInterface>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.deletePipeline],
    uriParams: {
      appId: pipeline.id,
    },
    method: 'DELETE',
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    returnType: UpdateReturnTypeEnum.RESPONSE,
  })

  return (
    <>
      <PipelineInfo pipeline={pipeline} />
      <Title>Deployments</Title>
      <ButtonGroup className={cx(elMb6)}>
        <Button
          loading={deploymentLoading}
          intent="primary"
          onClick={async (event) => {
            event.preventDefault()
            await sendFunc()
          }}
          disabled={pipeline.buildStatus === 'DELETING'}
        >
          Deploy
        </Button>
        <Button
          intent="critical"
          onClick={openNewPage('https://github.com/reapit/foundations/tree/master/packages/cli#readme')}
        >
          Deploy With Cli
        </Button>
        <Button
          loading={deleteLoading}
          intent="danger"
          disabled={pipeline.buildStatus === 'DELETING'}
          onClick={async (event) => {
            event.preventDefault()
            const result = await deleteFunc()

            console.log('de', result)

            if (result && typeof result !== 'boolean') setPipeline(result)
          }}
        >
          Delete Pipeline
        </Button>
      </ButtonGroup>
      <PipelineDeploymentTable
        pipeline={pipeline}
        initialDeployments={pipelineDeployments}
        newRunner={pipelineRunner}
        loading={loading}
        channel={channel}
      />
    </>
  )
}
