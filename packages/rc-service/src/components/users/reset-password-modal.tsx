import { useModal, Button, Modal, BodyText, ButtonGroup, PersistantNotification, elMb3 } from '@reapit/elements'
import { updateActions, UpdateActionNames, useReapitUpdate } from '@reapit/use-reapit-data'
import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export const ResetPasswordModal: FC<{ userId?: string }> = ({ userId }) => {
  const { modalIsOpen, openModal, closeModal } = useModal()

  const [userPasswordLoading, , deleteUserPassword] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.deleteUserPassword],
    method: 'DELETE',
    uriParams: {
      userId,
    },
  })
  const [showError, setShowError] = React.useState(false)

  return (
    <>
      <Button intent="neutral" onClick={openModal}>
        Reset
      </Button>
      <Modal
        title="Confirm reset password"
        isOpen={modalIsOpen}
        onModalClose={() => {
          closeModal()
        }}
      >
        <div>
          <BodyText>Are you sure you wish to reset this user password?</BodyText>
          {showError && (
            <PersistantNotification isInline className={elMb3} isFullWidth isExpanded intent="danger">
              Error resetting user password, please try again
            </PersistantNotification>
          )}
        </div>
        <ButtonGroup alignment="center">
          <Button
            intent="danger"
            onClick={async () => {
              setShowError(false)
              const worked = await deleteUserPassword()
              if (worked) {
                closeModal()
              } else {
                setShowError(true)
              }
            }}
            loading={userPasswordLoading}
          >
            Reset Password
          </Button>
          <Button intent="default" onClick={closeModal}>
            Close
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}
