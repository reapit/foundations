import { useModal, Button, Modal, PersistentNotification, Loader, ButtonGroup } from '@reapit/elements'
import { useReapitGet, getActions, GetActionNames } from '@reapit/use-reapit-data'
import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { AuthenticatorModel } from '@reapit/foundations-ts-definitions'
import { DisplayChip } from './__styles__'
import { ActiveAuthenticator } from './active-authenticator'

export const AuthenticatorModal: FC<{ userId?: string }> = ({ userId }) => {
  const { modalIsOpen, openModal, closeModal } = useModal()

  const [authenticators, authenticatorsLoading, , refreshAuthenticators] = useReapitGet<AuthenticatorModel[]>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getUserAuthenticators],
    uriParams: { userId },
    fetchWhenTrue: [userId, modalIsOpen],
  })
  const activeAuthenticator = authenticators?.find((authenticator) => authenticator.status === 'active')

  return (
    <>
      <Button intent="neutral" onClick={openModal}>
        Fetch
      </Button>
      <Modal
        title="MFA Authenticator"
        isOpen={modalIsOpen}
        onModalClose={() => {
          closeModal()
        }}
      >
        {activeAuthenticator && !authenticatorsLoading ? (
          <ActiveAuthenticator
            activeAuthenticator={activeAuthenticator}
            refreshAuthenticators={refreshAuthenticators}
          />
        ) : !authenticatorsLoading ? (
          <PersistentNotification isFullWidth isExpanded isInline intent="primary">
            No authenticators configured for this user.
          </PersistentNotification>
        ) : null}
        {authenticatorsLoading && modalIsOpen ? <Loader /> : null}
        <ButtonGroup alignment="right">
          <Button intent="default" onClick={closeModal}>
            Close
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}
