import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { ButtonGroup, FlexContainerBasic, H3, notification, Section } from '@reapit/elements-legacy'
import { Button, Table } from '@reapit/elements-legacy'
import { Loader } from '@reapit/elements'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { pipelineServiceDelete, pipelineServicePaginate } from '../../../platform-api/pipelines'

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [pipelines, setPipelines] = useState<PipelineModelInterface[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [deletionLoading, setDeletionLoading] = useState<string[]>([])

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

  return (
    <Section>
      <H3>Pipelines</H3>
      <Link to={Routes.PIPELINES_CREATION}>
        <Button type="button" variant="primary">
          Create new Pipeline
        </Button>
      </Link>
      <FlexContainerBasic centerContent flexColumn hasBackground hasPadding>
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
                    <Button variant="secondary">
                      <Link to={Routes.PIPELINES_SHOW.replace(':pipelineId', row.original.id)}>Manage</Link>
                    </Button>
                    <Button
                      loading={deletionLoading.includes(row.original.id)}
                      onClick={() => deletePipeline(row.original.id)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                ),
              },
            ]}
          />
        )}
      </FlexContainerBasic>
    </Section>
  )
}
