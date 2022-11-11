import React, { FC, useEffect } from 'react'
import { Button } from '@reapit/elements'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'

interface DeleteAuthenticatorProps {
  authenticatorId?: string
  refreshAuthenticators: () => void
}

export const handleDeleteAuthenticator = (deleteAuthenticator: SendFunction<void, boolean>) => () => {
  deleteAuthenticator()
}

export const handleRefresh = (refreshAuthenticators: () => void, hasDeleted?: boolean) => () => {
  if (hasDeleted) {
    refreshAuthenticators()
  }
}

export const DeleteAuthenticator: FC<DeleteAuthenticatorProps> = ({ authenticatorId, refreshAuthenticators }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const email = connectSession?.loginIdentity.email
  const userId = email ? window.btoa(email.toLowerCase()).replace(/=/g, '') : null

  const [deleteAuthenticatorLoading, , deleteAuthenticator, hasDeleted] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.deleteUserAuthenticator],
    method: 'DELETE',
    uriParams: {
      userId,
      authenticatorId,
    },
  })

  useEffect(handleRefresh(refreshAuthenticators, hasDeleted), [hasDeleted])

  return (
    <Button
      intent="primary"
      loading={deleteAuthenticatorLoading}
      disabled={deleteAuthenticatorLoading}
      onClick={handleDeleteAuthenticator(deleteAuthenticator)}
    >
      Reset Authenticator
    </Button>
  )
}
