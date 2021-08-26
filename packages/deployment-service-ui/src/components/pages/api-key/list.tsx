import Routes from '@/constants/routes'
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
  elMb8,
  elHFull,
  Title,
  Subtitle,
  Icon,
  BodyText,
  SecondaryNav,
  SecondaryNavItem,
  PageContainer,
  Button,
  Table,
} from '@reapit/elements'
import { ApiKeyInterface } from '@reapit/foundations-ts-definitions'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { shleemy } from 'shleemy'

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [apiKeys, setApiKeys] = useState<ApiKeyInterface[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [creationLoading, setCreationLoading] = useState<boolean>(false)
  const [deletionLoading, setDeletionLoading] = useState<string[]>([])
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location

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
        <Title>Api Keys</Title>
        <Icon className={elMb5} icon="developersMenu" iconSize="large" />
        <Subtitle>Api Keys</Subtitle>
        <BodyText hasGreyText>description about the api Keys</BodyText>
        <SecondaryNav className={elMb8}>
          <SecondaryNavItem onClick={() => history.push(Routes.API_KEYS)} active={pathname === Routes.API_KEYS}>
            My Api Keys
          </SecondaryNavItem>
          <SecondaryNavItem onClick={createApiKey} active={creationLoading}>
            Create Api Key
          </SecondaryNavItem>
        </SecondaryNav>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Title>Your Api Keys</Title>
        {loading ? (
          <Loader />
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
                  label: '',
                  value: 'delete',
                  children: (
                    <Button
                      loading={deletionLoading.includes(apiKey.id as string)}
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
