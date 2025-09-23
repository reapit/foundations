import { useModal, Button, Modal, BodyText, FormLayout, InputWrapFull, InputGroup, ButtonGroup } from '@reapit/elements'
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
        <BodyText>Are you sure you wish to reset this user password?</BodyText>
        <ButtonGroup alignment="center">
          <Button
            intent="danger"
            onClick={async () => {
              await deleteUserPassword()
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
