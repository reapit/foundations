import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { SendFunction, useReapitGet, useReapitUpdate } from '@reapit/use-reapit-data'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb11,
  FlexContainer,
  Loader,
  PersistentNotification,
  Table,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { ApiKeyEntityType, ApiKeyInterface } from '@reapit/foundations-ts-definitions'
import { useGlobalState } from '../../../core/use-global-state'
import { isoDateToHuman } from '../../../utils/date-time'
import CopyToClipboard from 'react-copy-to-clipboard'
import { elMr3 } from '@reapit/elements'
import { ExternalPages, openNewPage } from '../../../utils/navigation'

export interface ApiKeyMeta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

interface ApiKeysResponse {
  items: ApiKeyInterface[]
  meta: ApiKeyMeta
}

interface ApiKeysProps {
  closeModal: () => void
}

export const handleSetApikey = (setApiKeyId: Dispatch<SetStateAction<string | null>>, apiKeyid?: string) => () => {
  if (apiKeyid) {
    setApiKeyId(apiKeyid)
  }
}

export const handleDeleteApiKey =
  (
    setApiKeyId: Dispatch<SetStateAction<string | null>>,
    deleteApiKey: SendFunction<void, boolean | void>,
    refreshApiKeys: () => void,
    apiKeyId: string | null,
  ) =>
  () => {
    const handleDelete = async () => {
      const response = await deleteApiKey()
      if (response) {
        refreshApiKeys()
        setApiKeyId(null)
      }
    }

    if (apiKeyId) {
      handleDelete().catch((error) => console.error(error))
    }
  }

export const handleCreateApiKey =
  (
    createApiKey: SendFunction<Partial<ApiKeyInterface>, boolean | ApiKeyInterface>,
    refreshApiKeys: () => void,
    developerId?: string,
    email?: string,
  ) =>
  () => {
    const handleCreate = async () => {
      const keyExpiresAt = new Date()
      keyExpiresAt.setFullYear(keyExpiresAt.getFullYear() + 1)

      const response = await createApiKey({
        email,
        keyExpiresAt: keyExpiresAt.toISOString(),
        entityType: ApiKeyEntityType.DEPLOYMENT,
        developerId,
      })

      if (response) {
        refreshApiKeys()
      }
    }

    if (developerId && email) {
      handleCreate().catch((error) => console.error(error))
    }
  }

export const handleCopyCode = (setCopyState: Dispatch<SetStateAction<string>>, copied: string) => () => {
  setCopyState(copied)

  setTimeout(() => {
    setCopyState('')
  }, 5000)
}

export const ApiKeys: FC<ApiKeysProps> = ({ closeModal }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { globalDataState } = useGlobalState()
  const [copyState, setCopyState] = useState<string>('')
  const [apiKeyId, setApiKeyId] = useState<string | null>(null)
  const { currentDeveloper } = globalDataState
  const developerId = currentDeveloper?.id
  const email = currentDeveloper?.email

  const [apiKeys, apiKeysLoading, , refreshApiKeys] = useReapitGet<ApiKeysResponse>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getApiKeysByUserId],
    uriParams: {
      email: currentDeveloper?.email,
    },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    fetchWhenTrue: [connectSession?.idToken, currentDeveloper?.email],
  })

  const [creatingApiKey, , createApiKey] = useReapitUpdate<Partial<ApiKeyInterface>, ApiKeyInterface>({
    action: updateActions[UpdateActionNames.createApiKeyByMember],
    reapitConnectBrowserSession,
    method: 'POST',
    headers: {
      Authorization: connectSession?.idToken as string,
    },
  })

  const [deletingApiKey, , deleteApiKey] = useReapitUpdate<void, void>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.deleteApiKey],
    uriParams: {
      apiKeyId,
    },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    method: 'DELETE',
  })

  useEffect(handleDeleteApiKey(setApiKeyId, deleteApiKey, refreshApiKeys, apiKeyId), [apiKeyId])

  const isLoading = apiKeysLoading || creatingApiKey || deletingApiKey

  return (
    <>
      <BodyText hasGreyText>
        Manage your API keys here for use with the Reapit CLI tool. The CLI allows you to deploy your application as a
        zip folder from a local build on the command line, rather than having to grant access to your private repos.
      </BodyText>
      <BodyText hasGreyText>
        You only need an API key to use the Reapit CLI. If you prefer to use the web UI to manage your deployments, you
        can pass on this page.
      </BodyText>
      <BodyText hasGreyText>
        For more on the Reapit CLI visit <a onClick={openNewPage(ExternalPages.cliDocs)}>the docs here.</a>
      </BodyText>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {apiKeys?.items.length ? (
            <Table
              className={elMb11}
              numberColumns={3}
              rows={apiKeys?.items.map((item) => ({
                cells: [
                  {
                    label: 'API Key',
                    value: (
                      <FlexContainer>
                        <span className={elMr3}>{item.apiKey ?? ''}</span>
                        <CopyToClipboard
                          text={item.apiKey ?? ''}
                          onCopy={handleCopyCode(setCopyState, item.apiKey ?? '')}
                        >
                          <Button intent="low">{copyState === item.apiKey ? 'Copied' : 'Copy'}</Button>
                        </CopyToClipboard>
                      </FlexContainer>
                    ),
                    cellHasDarkText: true,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Expires',
                    value: item.keyExpiresAt ? isoDateToHuman(item.keyExpiresAt) : '',
                    cellHasDarkText: true,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                ],
                ctaContent: {
                  icon: 'trashSystem',
                  headerContent: 'Delete Key',
                  isCallToAction: true,
                  onClick: handleSetApikey(setApiKeyId, item.id),
                },
              }))}
            />
          ) : (
            <PersistentNotification className={elMb11} intent="primary" isExpanded isFullWidth isInline>
              No API keys currently configured for your organisation. You can create an API key below.
            </PersistentNotification>
          )}
          <ButtonGroup alignment="right">
            <Button intent="neutral" fixedWidth onClick={closeModal} disabled={isLoading}>
              Close
            </Button>
            <Button
              intent="primary"
              fixedWidth
              onClick={handleCreateApiKey(createApiKey, refreshApiKeys, developerId, email)}
              disabled={isLoading}
            >
              Create API Key
            </Button>
          </ButtonGroup>
        </>
      )}
    </>
  )
}
