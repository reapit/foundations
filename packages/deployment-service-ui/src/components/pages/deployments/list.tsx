import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { ButtonGroup, H3, Section } from '@reapit/elements'
import { Button, Table } from '@reapit/elements'
import { Loader } from '@reapit/elements/v3'
import { DeploymentModelInterface } from '@reapit/foundations-ts-definitions'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  deploymentServiceDelete,
  deploymentServicePaginate,
  deploymentServiceRun,
} from '../../../platform-api/deployments'

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [deployments, setDeployments] = useState<DeploymentModelInterface[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [deletionLoading, setDeletionLoading] = useState<string[]>([])
  const [deploying, setDeploying] = useState<string[]>([])

  useEffect(() => {
    const fetchDeployments = async () => {
      setLoading(true)
      const serviceResponse = await deploymentServicePaginate(connectSession as ReapitConnectSession)
      setLoading(false)
      if (serviceResponse) {
        setDeployments([...deployments, ...serviceResponse])
      }
    }
    if (connectSession) {
      fetchDeployments()
    }
  }, [connectSession])

  const deleteDeployment = async (id: string) => {
    setDeletionLoading([...deletionLoading, id])

    await deploymentServiceDelete(connectSession as ReapitConnectSession, id)

    setDeletionLoading(deletionLoading.filter((del) => del !== id))
    setDeployments(deployments.filter((deployment) => deployment.id !== id))
  }

  const deployDeployment = async (id: string) => {
    setDeploying([...deploying, id])

    await deploymentServiceRun(connectSession as ReapitConnectSession, id)
    setDeploying(deploying.filter((deploymentId) => deploymentId !== id))
  }

  return (
    <Section>
      <H3>Deployments</H3>
      <Link to={Routes.DEPLOYMENTS_CREATION}>
        <Button type="button" variant="primary">
          Create new Deployment
        </Button>
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <Table
          data={deployments}
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
                    onClick={() => deleteDeployment(row.original.id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                  <Button
                    loading={deploying.includes(row.original.id)}
                    onClick={() => deployDeployment(row.original.id)}
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
