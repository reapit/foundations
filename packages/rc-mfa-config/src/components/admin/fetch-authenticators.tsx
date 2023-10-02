import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Button, elMb7, Loader, PersistentNotification } from '@reapit/elements'
import { ButtonGroup } from '@reapit/elements'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { AuthenticatorModel } from '@reapit/foundations-ts-definitions'
import { ActiveAuthenticator } from '../active-authenticator'

interface FetchAuthenticatorsProps {
  userId?: string
}

export const handleShouldFetch = (setShouldFetch: Dispatch<SetStateAction<boolean>>) => () => {
  setShouldFetch(true)
}

export const FetchAuthenticators: FC<FetchAuthenticatorsProps> = ({ userId }) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false)

  const [authenticators, authenticatorsLoading, , refreshAuthenticators] = useReapitGet<AuthenticatorModel[]>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getUserAuthenticators],
    uriParams: { userId },
    fetchWhenTrue: [userId, shouldFetch],
  })

  const activeAuthenticator = authenticators?.find((authenticator) => authenticator.status === 'active')

  return (
    <>
      <ButtonGroup alignment="center" className={elMb7}>
        <Button
          intent="primary"
          loading={authenticatorsLoading}
          disabled={Boolean(authenticatorsLoading || authenticators)}
          onClick={handleShouldFetch(setShouldFetch)}
        >
          Fetch Current Authenticators
        </Button>
      </ButtonGroup>
      {authenticatorsLoading ? (
        <Loader />
      ) : activeAuthenticator ? (
        <ActiveAuthenticator activeAuthenticator={activeAuthenticator} refreshAuthenticators={refreshAuthenticators} />
      ) : shouldFetch ? (
        <PersistentNotification isFullWidth isExpanded isInline intent="primary">
          No authenticators configured for this user.
        </PersistentNotification>
      ) : null}
    </>
  )
}
