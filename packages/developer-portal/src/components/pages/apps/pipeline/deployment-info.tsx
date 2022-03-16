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

  return (
    <>
      <PipelineInfo pipeline={pipeline} setPipeline={setPipeline} />
      <Title>Deployments</Title>
      <ButtonGroup className={cx(elMb6)}>
        {pipeline.buildStatus === 'PAUSED' || pipeline.buildStatus === 'CREATING_ARCHITECTURE' ? (<Button
          onClick={async (event) => {
            event.preventDefault()
            await sendFunc()
          }}
          disabled={pipeline.buildStatus === 'CREATING_ARCHITECTURE'}
          loading={pipeline.buildStatus === 'CREATING_ARCHITECTURE'}
          intent="success"
        >
          Provision
        </Button>) : (<Button
          loading={deploymentLoading}
          intent="primary"
          onClick={async (event) => {
            event.preventDefault()
            await sendFunc()
          }}
          disabled={pipeline.buildStatus === 'DELETING'}
        >
          Deploy
        </Button>)}
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
