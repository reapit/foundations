import React, { useState } from 'react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { Button, ButtonGroup, elMb11, Pagination, Table, useModal } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { ApiKeyInterface } from '@reapit/foundations-ts-definitions'
import { useGlobalState } from '../../../core/use-global-state'

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

export const ApiKeys = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { Modal, openModal, closeModal } = useModal()
  const { globalDataState } = useGlobalState()
  const { currentDeveloper } = globalDataState
  const [apiKeyId, setApiKeyId] = useState<string | null>(null)

  const [apiKeys, apiKeysLoading] = useReapitGet<ApiKeysResponse>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApiKeysByUserId],
    uriParams: {
      email: currentDeveloper?.email,
    },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    fetchWhenTrue: [connectSession?.idToken, currentDeveloper?.email],
  })

  const [creatingApiKey, , createApiKey, apiKeyCreated] = useReapitUpdate<Partial<ApiKeyInterface>, ApiKeyInterface>({
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createApiKeyByMember],
    reapitConnectBrowserSession,
    method: 'POST',
    headers: {
      Authorization: connectSession?.idToken as string,
    },
  })

  const [deletingApiKey, , deleteApiKey, apiKeyDeleted] = useReapitUpdate<void, void>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.deleteApiKey],
    uriParams: {
      apiKeyId,
    },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    method: 'DELETE',
  })

  const isLoading = apiKeysLoading || creatingApiKey || deletingApiKey

  return (
    <>
      <Button intent="primary" onClick={openModal}>
        Api Keys
      </Button>
      <Modal title="API Keys Management">
        <Table
          className={elMb11}
          rows={apiKeys?.items.map((item) => ({
            cells: [
              {
                label: 'API Key',
                value: item.apiKey ?? '',
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Expires',
                value: item.apiKey ?? '',
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
              onClick: handleSetApikey(),
            },
          }))}
        />
        {/* {apiKeys && (
          <Pagination
            className={elMb11}
            currentPage={apiKeys.meta.currentPage}
            numberPages={apiKeys.meta.totalPages}
            callback={setPage}
          />
        )} */}
        <ButtonGroup alignment="center">
          <Button intent="low" fixedWidth onClick={closeModal} loading={isLoading} disabled={isLoading}>
            Close
          </Button>
          <Button intent="primary" fixedWidth onClick={handleCreateApiKey()} loading={isLoading} disabled={isLoading}>
            Create API Key
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}
