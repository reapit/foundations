import React, { FC } from 'react'
import { Button, ButtonGroup, MobileControls, Title, useMediaQuery, useModal } from '@reapit/elements'
import { ChangePasswordForm } from './change-password-form'
import { Controls } from '../page/controls'

export const SettingsPasswordPage: FC = () => {
  const { isMobile } = useMediaQuery()
  const { Modal, openModal, closeModal } = useModal()
  return (
    <>
      <Title>Password</Title>
      {isMobile && (
        <Modal title="Controls">
          <Controls />
          <ButtonGroup alignment="right">
            <Button intent="default" onClick={closeModal}>
              Close
            </Button>
          </ButtonGroup>
        </Modal>
      )}
      <ChangePasswordForm />
      <MobileControls onClick={openModal} />
    </>
  )
}

export default SettingsPasswordPage
