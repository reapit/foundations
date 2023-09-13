import React, { FC, useEffect } from 'react'
import { Button } from '@reapit/elements'
import { SendFunction, useReapitUpdate, UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { nativeSessionWrapper } from '../../core/connect-session-native'

interface DeleteAuthenticatorProps {
  authenticatorId?: string
  refreshAuthenticators: () => void
  userId?: string
}

export const handleDeleteAuthenticator = (deleteAuthenticator: SendFunction<void, boolean>) => () => {
  deleteAuthenticator()
}

export const handleRefresh = (refreshAuthenticators: () => void, hasDeleted?: boolean) => () => {
  if (hasDeleted) {
    refreshAuthenticators()
  }
}

export const DeleteAuthenticator: FC<DeleteAuthenticatorProps> = ({
  authenticatorId,
  userId,
  refreshAuthenticators,
}) => {
  const [deleteAuthenticatorLoading, , deleteAuthenticator, hasDeleted] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession: nativeSessionWrapper(reapitConnectBrowserSession),
    action: updateActions[UpdateActionNames.deleteUserAuthenticator],
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
