import { reapitConnectBrowserSession } from '@/core/connect-session'
import { configurationApiKeyApiCreateService, configurationApiKeyApiService } from '@/platform-api/configuration-api'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { H3, Section } from '@reapit/elements'
import { Button, Table } from '@reapit/elements'
import { Loader } from '@reapit/elements/v3'
import { ApiKeyInterface } from '@reapit/foundations-ts-definitions'
import React, { useEffect, useState } from 'react'

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [apiKeys, setApiKeys] = useState<ApiKeyInterface[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [creationLoading, setCreationLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchApiKeys = async () => {
      setLoading(true)
      const serviceResponse = await configurationApiKeyApiService(connectSession as ReapitConnectSession)
      setLoading(false)
      if (serviceResponse) {
        console.log(serviceResponse)
        setApiKeys(apiKeys)
      }
    }
    if (connectSession) {
      fetchApiKeys()
    }
  }, [connectSession])

  const createApiKey = async () => {
    setCreationLoading(true)

    const apiKey = await configurationApiKeyApiCreateService(connectSession as ReapitConnectSession, {})

    console.log(apiKey)

    setCreationLoading(false)
    if (apiKey) {
      setApiKeys([...apiKeys, ...[apiKey]])
    }
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
              Header: 'Name',
              accessor: 'name',
            },
            {
              Header: 'Created',
              accessor: 'createdAt',
              Cell: ({ cell, data }) => {
                console.log(cell, data)
                return <span>Created at</span>
              },
            },
            {
              Header: 'ApiKey',
              accessor: 'apiKey',
            },
          ]}
        />
      )}
    </Section>
  )
}
