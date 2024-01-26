import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { BodyText, Button, elMb7, Loader, PersistentNotification, useModal } from '@reapit/elements'
import { ButtonGroup } from '@reapit/elements'
import {
  GetActionNames,
  SendFunction,
  UpdateActionNames,
  getActions,
  updateActions,
  useReapitGet,
  useReapitUpdate,
} from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { AuthenticatorModel } from '@reapit/foundations-ts-definitions'
import { ActiveAuthenticator } from '../active-authenticator'

interface FetchAuthenticatorsProps {
  userId?: string
}

interface ShouldFetchState {
  authenticators?: boolean
  password?: boolean
}

export const handleShouldFetch =
  (setShouldFetch: Dispatch<SetStateAction<ShouldFetchState>>, shouldFetch: ShouldFetchState) => () => {
    setShouldFetch(shouldFetch)
  }

export const handleResetPassword =
  (deleteUserPassword: SendFunction<void, boolean>, setShouldFetch: Dispatch<SetStateAction<ShouldFetchState>>) =>
  async () => {
    const hasReset = await deleteUserPassword()

    if (hasReset) {
      setShouldFetch({})
    }
  }

export const FetchAuthenticators: FC<FetchAuthenticatorsProps> = ({ userId }) => {
  const [shouldFetch, setShouldFetch] = useState<ShouldFetchState>({})
  const { Modal } = useModal()

  const [authenticators, authenticatorsLoading, , refreshAuthenticators] = useReapitGet<AuthenticatorModel[]>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getUserAuthenticators],
    uriParams: { userId },
    fetchWhenTrue: [userId, shouldFetch],
  })

  const [userPasswordLoading, , deleteUserPassword] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.deleteUserPassword],
    method: 'DELETE',
    uriParams: {
      userId: userId,
    },
  })

  const activeAuthenticator = authenticators?.find((authenticator) => authenticator.status === 'active')

  return (
    <>
      <ButtonGroup alignment="center" className={elMb7}>
        <Button
          intent="primary"
          loading={authenticatorsLoading}
          disabled={Boolean(authenticatorsLoading || authenticators)}
          onClick={handleShouldFetch(setShouldFetch, { authenticators: true })}
        >
          Fetch Current Authenticators
        </Button>
        <Button intent="primary" onClick={handleShouldFetch(setShouldFetch, { password: true })}>
          Reset Password
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
      {shouldFetch.password && (
        <Modal title="Confirm reset user password" isOpen={Boolean(shouldFetch.password)}>
          <BodyText hasSectionMargin>Are you sure you wish to reset this user password?</BodyText>
          <ButtonGroup alignment="center">
            <Button
              intent="danger"
              disabled={userPasswordLoading}
              onClick={handleResetPassword(deleteUserPassword, setShouldFetch)}
            >
              Reset Password
            </Button>
            <Button intent="default" onClick={handleShouldFetch(setShouldFetch, {})}>
              Cancel
            </Button>
          </ButtonGroup>
        </Modal>
      )}
    </>
  )
}
