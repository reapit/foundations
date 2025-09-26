import React, { FC } from 'react'
import { Button } from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { SendFunction, UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'

interface DeleteAuthenticatorProps {
  authenticatorId?: string
  refreshAuthenticators: () => void
  userId?: string
}

export const handleDeleteAuthenticator =
  (deleteAuthenticator: SendFunction<void, boolean>, refreshAuthenticators: () => void) => () => {
    deleteAuthenticator().then(refreshAuthenticators)
  }

export const DeleteAuthenticator: FC<DeleteAuthenticatorProps> = ({
  authenticatorId,
  userId,
  refreshAuthenticators,
}) => {
  const [deleteAuthenticatorLoading, , deleteAuthenticator] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.deleteUserAuthenticator],
    method: 'DELETE',
    uriParams: {
      userId,
      authenticatorId,
    },
  })

  return (
    <Button
      intent="primary"
      loading={deleteAuthenticatorLoading}
      disabled={deleteAuthenticatorLoading}
      onClick={handleDeleteAuthenticator(deleteAuthenticator, refreshAuthenticators)}
    >
      Reset
    </Button>
  )
}
