import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import {
  pipelineRunnerCreate,
  pipelineRunnerPaginate,
  pipelineServiceGet,
  pipelineServiceDelete,
} from '@/platform-api/pipelines'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { FlexContainerBasic } from '@reapit/elements-legacy'
import {
  Button,
  Label,
  Loader,
  StatusIndicator,
  Table,
  Intent,
  FlexContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  elMb5,
  elMb8,
  elHFull,
  Title,
  Subtitle,
  Icon,
  BodyText,
  PageContainer,
  Tabs,
  elM1,
} from '@reapit/elements'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
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

const pipelineStatusToIntent = (status: string): Intent => {
  switch (status) {
    case 'CANCELED':
      return 'neutral'
    case 'FAILED':
      return 'danger'
    case 'IN_PROGRESS':
      return 'critical'
    case 'SUCCEEDED':
      return 'success'
    default:
      return 'neutral'
  }
}

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
              <StatusIndicator intent={pipelineStatusToIntent(pipeline.buildStatus as string)} /> {pipeline.buildStatus}
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
        </div>
      ),
    }
  })

  return runnerLoading ? (
    <FlexContainerBasic centerContent flexColumn hasBackground hasPadding>
      <Loader />
    </FlexContainerBasic>
  ) : pipelineRunnerPagination ? (
    <Table rows={pipelineRunnerMapped} expandableContentSize="large" />
  ) : (
    <Title>Error loading pipelines</Title>
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
  const location = useLocation()
  const { pathname } = location

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
        <Icon className={elMb5} icon="developersMenu" iconSize="large" />
        <Subtitle>Deployment pipeline manager</Subtitle>
        <BodyText hasGreyText>description about the pipeline service</BodyText>
        <SecondaryNav className={elMb8}>
          <SecondaryNavItem onClick={() => history.push(Routes.PIPELINES)} active={pathname === Routes.PIPELINES}>
            My Pipelines
          </SecondaryNavItem>
          <SecondaryNavItem
            onClick={() => history.push(Routes.PIPELINES_CREATION)}
            active={pathname === Routes.PIPELINES_CREATION}
          >
            Create new Pipeline
          </SecondaryNavItem>
        </SecondaryNav>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        {loading ? (
          <FlexContainerBasic centerContent flexColumn hasBackground hasPadding>
            <Loader />
          </FlexContainerBasic>
        ) : connectSession && pipeline ? (
          <>
            <Title>
              <StatusIndicator intent={pipelineStatusToIntent(pipeline?.buildStatus as string)} /> Pipeline{' '}
              {pipeline?.name}
            </Title>
            <FlexContainer>
              <Button className={cx(elM1)} loading={deployLoading} onClick={() => deployPipeline()} intent="success">
                Deploy
              </Button>
              <Button className={cx(elM1)} intent="critical">
                <Link to={Routes.PIPELINES_UPDATE.replace(':pipelineId', pipeline.id as string)}>Update</Link>
              </Button>
              <Button
                className={cx(elM1)}
                intent="danger"
                loading={deletionLoading}
                onClick={() => deletePipeline(pipeline.id as string)}
              >
                Delete
              </Button>
            </FlexContainer>
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
                <p>{pipeline?.packageManager}</p>
                <Label>Build Command</Label>
                <p>{pipeline?.buildCommand}</p>
                <Label>Repository</Label>
                <p>{pipeline?.repository}</p>
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
