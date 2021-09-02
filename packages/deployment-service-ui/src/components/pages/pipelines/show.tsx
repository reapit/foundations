import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import {
  pipelineRunnerCreate,
  pipelineRunnerPaginate,
  pipelineServiceGet,
  pipelineServiceDelete,
} from '@/platform-api/pipelines'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { FlexContainerBasic, notification } from '@reapit/elements-legacy'
import {
  Button,
  Label,
  Loader,
  StatusIndicator,
  Table,
  FlexContainer,
  SecondaryNavContainer,
  elMb5,
  elHFull,
  Title,
  Subtitle,
  Icon,
  BodyText,
  PageContainer,
  Tabs,
  elM1,
  PersistantNotification,
} from '@reapit/elements'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import {
  PipelineModelInterface,
  PipelineRunnerModelInterface,
  TaskModelInterface,
} from '@reapit/foundations-ts-definitions'
import { Pagination } from 'nestjs-typeorm-paginate'
import { PipelineTask } from '@/components/task'
import { useChannel, useEvent } from '@harelpls/use-pusher'
import { shleemy } from 'shleemy'
import { cx } from '@linaria/core'
import { pipelineStatusToIntent, pipelineStatusToName } from './../../../utils'

const findRelevantTask = (tasks: TaskModelInterface[]): TaskModelInterface => {
  const priority: { [s: string]: number } = {
    ['CANCELED']: 1,
    ['FAILED']: 4,
    ['SUCCEEDED']: 3,
    ['RUNNING']: 5,
    ['PENDING']: 2,
  }

  return tasks.sort((a, b) => {
    return priority[a.buildStatus as string] - priority[b.buildStatus as string]
  })[0]
}

const DeploymentTable = ({
  connectSession,
  pipeline,
  setPipelineRunnerPagination,
  pipelineRunnerPagination,
}: {
  connectSession: ReapitConnectSession
  pipeline: PipelineModelInterface
  setPipelineRunnerPagination: (runners: Pagination<PipelineModelInterface>) => void
  pipelineRunnerPagination?: Pagination<PipelineRunnerModelInterface>
}) => {
  const channel = useChannel(pipeline?.developerId)
  const [runnerLoading, setRunnerLoading] = useState<boolean>(false)

  useEvent<PipelineModelInterface>(channel, 'pipeline-runner-update', (event) => {
    if (!pipelineRunnerPagination || !event) {
      return
    }

    setPipelineRunnerPagination({
      ...pipelineRunnerPagination,
      items: pipelineRunnerPagination.items.map((item) => {
        if (item.id !== event.id) {
          return item
        }

        return event
      }),
    })
  })

  useEffect(() => {
    const fetchPipelineRunners = async () => {
      setRunnerLoading(true)

      const response = await pipelineRunnerPaginate(
        connectSession as ReapitConnectSession,
        pipeline as PipelineModelInterface,
      )

      if (response) {
        setPipelineRunnerPagination(response)
      }
      setRunnerLoading(false)
    }

    if (pipeline) {
      fetchPipelineRunners()
    }
  }, [pipeline])

  const pipelineRunnerMapped = pipelineRunnerPagination?.items.map((pipeline) => {
    const started = shleemy(pipeline.created as string)

    return {
      cells: [
        {
          label: 'Started',
          value: started.forHumans,
        },
        {
          label: 'Tasks',
          value: Array.isArray(pipeline.tasks)
            ? pipeline.buildStatus === 'IN_PROGRESS'
              ? (findRelevantTask(pipeline.tasks).buildStatus as string)
              : pipeline.tasks.length.toString()
            : '0',
        },
        {
          label: 'Status',
          value: pipeline.buildStatus?.toString() || '',
          children: (
            <>
              <StatusIndicator intent={pipelineStatusToIntent(pipeline.buildStatus as string)} />{' '}
              {pipelineStatusToName(pipeline.buildStatus ?? '')}
            </>
          ),
        },
      ],
      expandableContent: (
        <div>
          <Subtitle>Tasks</Subtitle>
          <ul>
            {pipeline.tasks?.map((task) => (
              <PipelineTask task={task} key={task.id} />
            ))}
          </ul>
          <Button
            intent="primary"
            disabled={!['SUCCEEDED', 'FAILED'].includes(pipeline.buildStatus as string)}
            onClick={() => {
              if (pipeline.s3BuildLogsLocation) {
                window.open(pipeline.s3BuildLogsLocation as string)
              } else {
                notification.error({ message: 'Unable to download logs' })
              }
            }}
          >
            Download logs
          </Button>
        </div>
      ),
    }
  })

  return runnerLoading ? (
    <FlexContainerBasic centerContent flexColumn hasBackground hasPadding>
      <Loader />
    </FlexContainerBasic>
  ) : pipelineRunnerPagination && pipelineRunnerMapped?.length ? (
    <Table rows={pipelineRunnerMapped} expandableContentSize="large" />
  ) : (
    <PersistantNotification intent="secondary" isExpanded isInline isFullWidth>
      No pipleline runs found
    </PersistantNotification>
  )
}

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [loading, setLoading] = useState<boolean>(false)
  const [pipeline, setPipeline] = useState<PipelineModelInterface | undefined>()
  const params = useParams<{ pipelineId: string }>()
  const [pipelineRunnerPagination, setPipelineRunnerPagination] = useState<Pagination<PipelineRunnerModelInterface>>()
  const [deployLoading, setDeployLoading] = useState<boolean>(false)
  const [deletionLoading, setDeletionLoading] = useState<boolean>(false)
  const [tabIndex, setTabIndex] = useState<string>('deployments')

  const history = useHistory()

  const deletePipeline = async (id: string) => {
    setDeletionLoading(true)

    await pipelineServiceDelete(connectSession as ReapitConnectSession, id)

    setDeletionLoading(false)

    history.push(Routes.PIPELINES)
  }

  const deployPipeline = async () => {
    if (!pipeline || deployLoading) {
      return
    }
    setDeployLoading(true)
    const runner = await pipelineRunnerCreate(connectSession as ReapitConnectSession, pipeline)
    setDeployLoading(false)
    if (pipelineRunnerPagination && runner) {
      setPipelineRunnerPagination({
        ...pipelineRunnerPagination,
        items: [runner, ...pipelineRunnerPagination.items],
      })
    }
  }

  useEffect(() => {
    const fetchPipeline = async () => {
      setLoading(true)
      const serviceResponse = await pipelineServiceGet(connectSession as ReapitConnectSession, params.pipelineId)
      setLoading(false)
      if (serviceResponse) {
        setPipeline(serviceResponse)
      }
    }
    if (connectSession) {
      fetchPipeline()
    }
  }, [connectSession])

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Pipelines</Title>
        <Icon className={elMb5} icon="apiDocsInfographic" iconSize="large" />
        <Subtitle>Pipeline Manager</Subtitle>
        <BodyText hasGreyText>
          For information on pipleine controls and deploying your app, read the documentation below:
        </BodyText>
        <Button className={elMb5} intent="neutral">
          View Docs
        </Button>
        <Button className={elMb5} intent="critical" onClick={() => history.push(Routes.PIPELINES)}>
          View Pipelines
        </Button>
        <Subtitle>Pipeline Actions</Subtitle>
        <BodyText hasGreyText>Control your pipleine here by performing one of the operations below.</BodyText>
        <Button className={cx(elM1)} loading={deployLoading} onClick={() => deployPipeline()} intent="success">
          Deploy
        </Button>
        <Button
          className={cx(elM1)}
          intent="critical"
          onClick={() => history.push(Routes.PIPELINES_UPDATE.replace(':pipelineId', pipeline?.id as string))}
        >
          Update
        </Button>
        <Button
          className={cx(elM1)}
          intent="danger"
          loading={deletionLoading}
          onClick={() => deletePipeline(pipeline?.id as string)}
        >
          Delete
        </Button>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        {loading ? (
          <FlexContainerBasic centerContent flexColumn hasBackground hasPadding>
            <Loader />
          </FlexContainerBasic>
        ) : connectSession && pipeline ? (
          <>
            <Title>{pipeline?.name}</Title>
            <Tabs
              name="pipeline-tabs"
              isFullWidth
              onChange={(event) => {
                // @ts-ignore
                setTabIndex(event.target.value)
              }}
              options={[
                {
                  id: 'deployments',
                  value: 'deployments',
                  text: 'Deployments',
                  isChecked: tabIndex === 'deployments',
                },
                {
                  id: 'details',
                  value: 'details',
                  text: 'Details',
                  isChecked: tabIndex === 'details',
                },
              ]}
            />
            {tabIndex === 'details' ? (
              <>
                <Label>Package Manager</Label>
                <BodyText>{pipeline?.packageManager}</BodyText>
                <Label>Build Command</Label>
                <BodyText>{pipeline?.buildCommand}</BodyText>
                <Label>Repository</Label>
                <BodyText>{pipeline?.repository}</BodyText>
                <Label>Out Dir</Label>
                <BodyText>{pipeline?.outDir}</BodyText>
              </>
            ) : (
              <DeploymentTable
                connectSession={connectSession}
                pipeline={pipeline}
                pipelineRunnerPagination={pipelineRunnerPagination}
                setPipelineRunnerPagination={setPipelineRunnerPagination}
              />
            )}
          </>
        ) : (
          <>
            <Title>No pipeline found</Title>
            <Link to={Routes.PIPELINES}>Back</Link>
          </>
        )}
      </PageContainer>
    </FlexContainer>
  )
}
