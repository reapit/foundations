import { reapitConnectBrowserSession } from '@/core/connect-session'
import {
  configurationApiKeyApiCreateService,
  configurationApiKeyApiDeleteService,
  configurationApiKeyApiService,
} from '@/platform-api/configuration-api'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { H3, Section } from '@reapit/elements'
import { Button, Table } from '@reapit/elements'
import { Loader } from '@reapit/elements/v3'
import { ApiKeyInterface } from '@reapit/foundations-ts-definitions'
import React, { useEffect, useState } from 'react'
import { shleemy } from 'shleemy'

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [apiKeys, setApiKeys] = useState<ApiKeyInterface[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [creationLoading, setCreationLoading] = useState<boolean>(false)
  const [deletionLoading, setDeletionLoading] = useState<string[]>([])

  useEffect(() => {
    const fetchApiKeys = async () => {
      setLoading(true)
      const serviceResponse = await configurationApiKeyApiService(connectSession as ReapitConnectSession)
      setLoading(false)
      if (serviceResponse) {
        setApiKeys(serviceResponse)
      }
    }
    if (connectSession) {
      fetchApiKeys()
    }
  }, [connectSession])

  const createApiKey = async () => {
    setCreationLoading(true)

    const apiKey = await configurationApiKeyApiCreateService(connectSession as ReapitConnectSession, {})

    setCreationLoading(false)
    if (apiKey) {
      setApiKeys([...apiKeys, ...[apiKey]])
    }
  }

  const deleteApiKey = async (id: string) => {
    setDeletionLoading([...deletionLoading, id])

    configurationApiKeyApiDeleteService(connectSession as ReapitConnectSession, id)

    setDeletionLoading(deletionLoading.filter((del) => del !== id))
    setApiKeys(apiKeys.filter((apiKey) => (apiKey as { id: string }).id !== id))
  }

  return (
    <Section>
      <H3>Api Keys</H3>
      <Button onClick={createApiKey} loading={creationLoading} type="button" variant="primary">
        Create new ApiKey
      </Button>
      {loading ? (
        <Loader />
      ) : (
        <Table
          data={apiKeys}
          columns={[
            {
              Header: 'ApiKey',
              accessor: 'apiKey',
            },
            {
              Header: 'Expires',
              accessor: 'keyExpiresAt',
              Cell: (cell: { value }) => {
                const int = shleemy(cell.value)
                return (
                  <span>
                    {int.date} {int.time}
                  </span>
                )
              },
            },
            {
              Header: 'Created',
              accessor: 'keyCreatedAt',
              Cell: (cell: { value }) => {
                const int = shleemy(cell.value)

                return <span>{int.forHumans}</span>
              },
            },
            {
              id: 'Delete',
              Cell: ({ row }: { row: { original: any } }) => (
                <Button onClick={() => deleteApiKey(row.original.id)} variant="danger">
                  Delete
                </Button>
              ),
            },
          ]}
        />
      )}
    </Section>
  )
}
