import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { elMb11, Loader, Pagination, StatusIndicator, Table } from '@reapit/elements'
import { PipelineModelInterface, PipelineRunnerModelInterface } from '@reapit/foundations-ts-definitions'
import { useAppState } from '../state/use-app-state'
import { buildStatusToIntent, buildStatusToReadable, runnerTypeToReadable } from '../../../utils/pipeline-helpers'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { TaskList } from './pipeline-tasks-list'
import { isoDateToHuman } from '../../../utils/date-time'
import { useChannel, useEvent } from '@harelpls/use-pusher'

export type PipelineRunnerMeta = {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export interface PipelineRunnerResponse {
  items: PipelineRunnerModelInterface[]
  meta: PipelineRunnerMeta
}

export type PipelineRunnerEvent = PipelineRunnerModelInterface & { pipeline: PipelineModelInterface }

export const handlePipelineRunnerRefresh =
  (
    setAppPipelineDeploying: Dispatch<SetStateAction<boolean>>,
    refreshPipelineRunners: () => void,
    appPipelineDeploying: boolean,
  ) =>
  () => {
    if (appPipelineDeploying) {
      refreshPipelineRunners()
      setAppPipelineDeploying(false)
    }
  }

export const handleInitialRunners =
  (
    pipelineDeployments: PipelineRunnerResponse | null,
    setPipelineDeploymentItems: Dispatch<SetStateAction<PipelineRunnerModelInterface[]>>,
  ) =>
  () => {
    if (pipelineDeployments && pipelineDeployments.items) {
      setPipelineDeploymentItems(pipelineDeployments.items)
    }
  }

export const handleNewRunner =
  (
    appPipeline: PipelineModelInterface | null,
    pipelineDeploymentsItems: PipelineRunnerModelInterface[],
    setPipelineDeploymentItems: Dispatch<SetStateAction<PipelineRunnerModelInterface[]>>,
  ) =>
  (event?: PipelineRunnerEvent) => {
    if (!event) {
      return
    }

    if (!event.pipeline || appPipeline?.id !== event.pipeline.id) {
      return
    }

    if (!pipelineDeploymentsItems.length) {
      setPipelineDeploymentItems([event])
    } else {
      setPipelineDeploymentItems(
        pipelineDeploymentsItems.map((item) => {
          return item.id === event.id ? event : item
        }),
      )
    }
  }

export const PipelineDeploymentTable: FC = () => {
  const [page, setPage] = useState(1)
  const [pipelineDeploymentsItems, setPipelineDeploymentItems] = useState<PipelineRunnerModelInterface[]>([])
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appPipelineState } = useAppState()
  const { appPipeline, setAppPipelineDeploying, appPipelineDeploying } = appPipelineState

  const [pipelineDeployments, loading, , refreshPipelineRunners] = useReapitGet<PipelineRunnerResponse>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getPipelineDeployments],
    uriParams: {
      pipelineId: appPipeline?.id,
    },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    fetchWhenTrue: [connectSession?.idToken],
    queryParams: {
      page,
    },
  })

  const channel = useChannel(`private-${connectSession?.loginIdentity.developerId}`)

  useEvent<PipelineRunnerEvent>(
    channel,
    'pipeline-runner-update',
    handleNewRunner(appPipeline, pipelineDeploymentsItems, setPipelineDeploymentItems),
  )

  useEffect(handleInitialRunners(pipelineDeployments, setPipelineDeploymentItems), [pipelineDeployments])

  useEffect(handlePipelineRunnerRefresh(setAppPipelineDeploying, refreshPipelineRunners, appPipelineDeploying), [
    appPipelineDeploying,
  ])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Table
            className={elMb11}
            rows={pipelineDeploymentsItems.map(
              ({ type, created, buildStatus, buildVersion, currentlyDeployed, tasks }) => ({
                cells: [
                  {
                    label: 'Release Type',
                    value: type ? runnerTypeToReadable(type) : 'Unknown',
                    cellHasDarkText: true,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Created',
                    value: created ? isoDateToHuman(created) : '-',
                    cellHasDarkText: true,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Status',
                    value: '',
                    children: (
                      <>
                        <StatusIndicator intent={buildStatusToIntent(buildStatus as string)} />
                        {buildStatusToReadable(buildStatus as string)}
                      </>
                    ),
                    cellHasDarkText: true,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Version',
                    value: buildVersion,
                    cellHasDarkText: true,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Currently Deployed',
                    value: currentlyDeployed ? 'Deployed' : 'Not Deployed',
                    cellHasDarkText: true,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                ],
                expandableContent: {
                  content: <TaskList tasks={tasks} />,
                },
              }),
            )}
          />
          {pipelineDeployments && (
            <Pagination
              currentPage={pipelineDeployments.meta.currentPage}
              numberPages={pipelineDeployments.meta.totalPages}
              callback={setPage}
            />
          )}
        </>
      )}
    </>
  )
}
