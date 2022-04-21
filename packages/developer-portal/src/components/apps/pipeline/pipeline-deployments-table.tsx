import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import {
  elMt3,
  Loader,
  Pagination,
  PersistantNotification,
  Table,
  TableCell,
  TableExpandableRow,
  TableExpandableRowTriggerCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
  TableRowContainer,
} from '@reapit/elements'
import { PipelineRunnerModelInterface } from '@reapit/foundations-ts-definitions'
// import { useChannel, useEvent } from '@harelpls/use-pusher'
import dayjs from 'dayjs'
import { useAppState } from '../state/use-app-state'
import { buildStatusToReadable } from '../../../utils/pipeline-helpers'
import { fourColTable } from './__styles__'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'

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

interface PipelineRunnerSetterInterface {
  initialDeployments: null | { items: PipelineRunnerModelInterface[] }
  setPagination: (
    value: React.SetStateAction<{
      items: PipelineRunnerModelInterface[]
    } | null>,
  ) => void
}

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

export const pipelineRunnerSetter =
  ({ initialDeployments, setPagination }: PipelineRunnerSetterInterface) =>
  () => {
    if (!initialDeployments) {
      return
    }

    const deploymentIds = initialDeployments.items.map((item) => item.id)

    setPagination((currentState) => {
      if (currentState === null || (!currentState.items && initialDeployments !== null)) {
        return initialDeployments
      }

      return {
        items: currentState.items.reduce<PipelineRunnerModelInterface[]>((items, runner) => {
          if (deploymentIds.includes(runner.id)) {
            return items
          }

          items.push(runner)

          return items
        }, initialDeployments.items),
      }
    })
  }

interface TaskListProps {
  tasks: PipelineRunnerModelInterface['tasks']
}

export const TaskList: FC<TaskListProps> = ({ tasks }) => {
  if (!tasks || !tasks.length) {
    return (
      <PersistantNotification isInline isFullWidth isExpanded intent="secondary">
        No progress reported for this deployment
      </PersistantNotification>
    )
  }
  return (
    <Table>
      <TableHeadersRow className={fourColTable}>
        <TableHeader>Task</TableHeader>
        <TableHeader>Status</TableHeader>
        <TableHeader>Started</TableHeader>
        <TableHeader>Finished</TableHeader>
      </TableHeadersRow>
      {tasks.map((task) => (
        <TableRow key={task.id} className={fourColTable}>
          <TableCell>{task.functionName}</TableCell>
          <TableCell>{buildStatusToReadable(task.buildStatus as string)}</TableCell>
          <TableCell>{task.startTime ? dateToHuman(task.startTime) : '-'}</TableCell>
          <TableCell>{task.endTime ? dateToHuman(task.endTime) : '-'}</TableCell>
        </TableRow>
      ))}
    </Table>
  )
}

const isoDateToHuman = (isoDateStr: string) => dayjs(isoDateStr).format('DD MMM YYYY hh:mm:ss')
const dateToHuman = (date: Date) => dayjs(date).format('DD MMM YYYY hh:mm:ss')

export const PipelineDeploymentTable: FC = () => {
  const [page, setPage] = useState(1)
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

  const [pagination, setPagination] = useState<{
    items: PipelineRunnerModelInterface[]
  } | null>(pipelineDeployments)

  const [isOpen, setIsOpen] = useState<string>('')

  useEffect(
    pipelineRunnerSetter({
      initialDeployments: pipelineDeployments,
      setPagination,
    }),
    [pipelineDeployments],
  )

  // useEffect(
  //   addNewPipelineDeployment({
  //     newRunner,
  //     setPagination,
  //     pagination,
  //   }),
  //   [newRunner],
  // )

  // const channel = useChannel(`private-${connectSession?.loginIdentity.developerId}`)

  // useEvent<PipelineRunnerModelInterface & { pipeline: PipelineModelInterface }>(
  //   channel,
  //   'pipeline-runner-update',
  //   (event) => {
  //     if (!event) {
  //       return
  //     }

  //     if (!event.pipeline || appPipeline?.id !== event.pipeline.id) {
  //       return
  //     }

  //     if (pagination === null) {
  //       setPagination({ items: [event] })
  //       return
  //     }

  //     setPagination({
  //       items: pagination.items.map((item) => {
  //         return item.id === event.id ? event : item
  //       }),
  //     })
  //   },
  // )

  useEffect(handlePipelineRunnerRefresh(setAppPipelineDeploying, refreshPipelineRunners, appPipelineDeploying), [
    appPipelineDeploying,
  ])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Table data-has-expandable-action data-num-columns-excl-action-col="5">
            <TableHeadersRow>
              <TableHeader>Type</TableHeader>
              <TableHeader>Created</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Version</TableHeader>
              <TableHeader>Currently Deployed</TableHeader>
              {pagination?.items.some((item) => !!item.tasks?.length) && <TableHeader></TableHeader>}
            </TableHeadersRow>
            {pagination !== null
              ? pagination.items.map((deployment) => (
                  <TableRowContainer key={deployment.id}>
                    <TableRow>
                      <TableCell>{deployment.type}</TableCell>
                      <TableCell>{deployment.created && isoDateToHuman(deployment.created)}</TableCell>
                      <TableCell>{buildStatusToReadable(deployment.buildStatus as string)}</TableCell>
                      <TableCell>{deployment.buildVersion}</TableCell>
                      <TableCell>{deployment.currentlyDeployed ? 'Deployed' : ''}</TableCell>
                      <TableExpandableRowTriggerCell
                        isOpen={isOpen === deployment.id}
                        onClick={() => {
                          if (!deployment.id) {
                            return
                          }
                          if (isOpen === deployment.id) {
                            setIsOpen('')
                          } else {
                            setIsOpen(deployment.id)
                          }
                        }}
                      />
                    </TableRow>
                    <TableExpandableRow isOpen={isOpen === deployment.id}>
                      <TaskList tasks={deployment.tasks} />
                    </TableExpandableRow>
                  </TableRowContainer>
                ))
              : null}
          </Table>
          {pipelineDeployments && (
            <div className={elMt3}>
              <Pagination
                currentPage={pipelineDeployments.meta.currentPage}
                numberPages={pipelineDeployments.meta.totalPages}
                callback={(page) => {
                  setPage(page)
                }}
              />
            </div>
          )}
        </>
      )}
    </>
  )
}
