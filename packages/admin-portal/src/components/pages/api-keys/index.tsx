import React, { useState } from 'react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useParams } from 'react-router'
import { Button, Loader, Modal } from '@reapit/elements'
import { ApiKeyInterface } from '@reapit/foundations-ts-definitions'

const ApiKeyModal = ({ onClose }: { onClose: () => void }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { userId } = useParams<{ userId: string }>()

  const [apiKeys, loading] = useReapitGet<ApiKeyInterface[]>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApiKeysByUserId],
    uriParams: {
      userId,
    },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    fetchWhenTrue: [connectSession?.idToken],
  })

  return (
    <>
      <Button>Api Keys</Button>
      <Modal title="Api Keys" isOpen={true} onModalClose={() => onClose()}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h3>Current api keys</h3>
            {apiKeys?.map((key) => (
              <li key={key.id}>{key.apiKey}</li>
            ))}
            <Button intent="secondary">Create New</Button>
          </>
        )}
      </Modal>
    </>
  )
}

export const ApiKeys = () => {
  const [active, setActive] = useState<boolean>(false)

  return (
    <>
      <Button intent="primary" onClick={() => setActive(true)}>
        Api Keys
      </Button>
      {active && <ApiKeyModal onClose={() => setActive(false)} />}
    </>
  )
}
