import { reapitConnectBrowserSession } from '@/core/connect-session'
import {
  configurationApiKeyApiCreateService,
  configurationApiKeyApiDeleteService,
  configurationApiKeyApiService,
} from '@/platform-api/configuration-api'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import {
  FlexContainer,
  Loader,
  SecondaryNavContainer,
  elMb5,
  elHFull,
  Title,
  Subtitle,
  Icon,
  BodyText,
  PageContainer,
  Button,
  Table,
} from '@reapit/elements'
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

    await configurationApiKeyApiDeleteService(connectSession as ReapitConnectSession, id)

    setDeletionLoading(deletionLoading.filter((del) => del !== id))
    setApiKeys(apiKeys.filter((apiKey) => (apiKey as { id: string }).id !== id))
  }

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>API Keys</Title>
        <Icon className={elMb5} icon="apiInfographic" iconSize="large" />
        <Subtitle>Pipeline Authentication</Subtitle>
        <BodyText hasGreyText>
          You will need to have a valid API key to access our deployments as a service infrastructure via the CLI tools.
          For more information read the documentation below:
        </BodyText>
        <Button className={elMb5} intent="neutral">
          View Docs
        </Button>
        <Button
          className={elMb5}
          intent="critical"
          onClick={createApiKey}
          loading={creationLoading}
          disabled={creationLoading}
        >
          New API Key
        </Button>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Title>Your API Keys</Title>
        {loading ? (
          <Loader label="Loading" fullPage />
        ) : (
          <Table
            rows={apiKeys.map((apiKey) => ({
              cells: [
                {
                  label: 'ApiKey',
                  value: apiKey.apiKey as string,
                },
                {
                  label: 'Expires',
                  value: apiKey.keyExpiresAt as string,
                  children: (
                    <>
                      {shleemy(apiKey.keyCreatedAt as string).date} {shleemy(apiKey.keyCreatedAt as string).time}
                    </>
                  ),
                },
                {
                  label: 'Created',
                  value: apiKey.keyCreatedAt as string,
                  children: <>{shleemy(apiKey.keyCreatedAt as string).forHumans}</>,
                },
                {
                  label: 'Delete Key',
                  value: 'delete',
                  children: (
                    <Button
                      loading={deletionLoading.includes(apiKey.id as string)}
                      disabled={deletionLoading.includes(apiKey.id as string)}
                      onClick={() => deleteApiKey(apiKey.id as string)}
                      intent="danger"
                    >
                      Delete
                    </Button>
                  ),
                },
              ],
            }))}
          />
        )}
      </PageContainer>
    </FlexContainer>
  )
}
