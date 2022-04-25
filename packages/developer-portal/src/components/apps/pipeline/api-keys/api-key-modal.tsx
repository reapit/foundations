import React from 'react'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { Loader, Modal, Subtitle } from '@reapit/elements'
import { ApiKeyInterface } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { ApiKeyTable } from './api-key-table'

export const ApiKeyModal = ({
  onClose,
  email,
  developerId,
}: {
  onClose: () => void
  email: string
  developerId?: string
}) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [pagination, loading] = useReapitGet<{
    items: ApiKeyInterface[]
  }>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApiKeysByUserId],
    uriParams: {
      email,
    },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    fetchWhenTrue: [connectSession?.idToken],
  })

  return (
    <>
      <Modal title="Api Keys" isOpen={true} onModalClose={() => onClose()}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Subtitle>Current api keys</Subtitle>
            <ApiKeyTable
              initialPagination={pagination}
              connectSession={connectSession}
              email={email}
              developerId={developerId as string}
            />
          </>
        )}
      </Modal>
    </>
  )
}
