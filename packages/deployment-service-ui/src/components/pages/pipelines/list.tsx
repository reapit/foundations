import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { ButtonGroup, H3, notification, Section } from '@reapit/elements'
import { Button, Table } from '@reapit/elements'
import { Loader } from '@reapit/elements/v3'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  pipelineServiceDelete,
  pipelineServicePaginate,
  pipelineServiceRun,
} from '../../../platform-api/pipelines'

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [pipelines, setPipelines] = useState<PipelineModelInterface[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [deletionLoading, setDeletionLoading] = useState<string[]>([])
  const [deploying, setDeploying] = useState<string[]>([])

  useEffect(() => {
    const fetchPipelines = async () => {
      setLoading(true)
      const serviceResponse = await pipelineServicePaginate(connectSession as ReapitConnectSession)
      setLoading(false)
      if (serviceResponse) {
        setPipelines([...pipelines, ...serviceResponse])
      }
    }
    if (connectSession) {
      fetchPipelines()
    }
  }, [connectSession])

  const deletePipeline = async (id: string) => {
    setDeletionLoading([...deletionLoading, id])

    await pipelineServiceDelete(connectSession as ReapitConnectSession, id)

    setDeletionLoading(deletionLoading.filter((del) => del !== id))
    setPipelines(pipelines.filter((pipeline) => pipeline.id !== id))
    notification.success({ message: 'Pipeline deleted' })
  }

  const deployPipeline = async (id: string) => {
    setDeploying([...deploying, id])

    await pipelineServiceRun(connectSession as ReapitConnectSession, id)
    setDeploying(deploying.filter((pipelineId) => pipelineId !== id))
  }

  return (
    <Section>
      <H3>Pipelines</H3>
      <Link to={Routes.PIPELINES_CREATION}>
        <Button type="button" variant="primary">
          Create new Pipeline
        </Button>
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <Table
          data={pipelines}
          columns={[
            {
              Header: 'Name',
              accessor: 'name',
            },
            {
              Header: 'Repository',
              accessor: 'repository',
            },
            {
              id: 'Delete',
              Cell: ({ row }: { row: { original: any } }) => (
                <ButtonGroup>
                  <Button
                    loading={deletionLoading.includes(row.original.id)}
                    onClick={() => deletePipeline(row.original.id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                  <Button
                    loading={deploying.includes(row.original.id)}
                    onClick={() => deployPipeline(row.original.id)}
                    variant="info"
                  >
                    Deploy
                  </Button>
                </ButtonGroup>
              ),
            },
          ]}
        />
      )}
    </Section>
  )
}
