import React, { FC } from 'react'
import { Button, ButtonGroup, FlexContainer, Title, useMediaQuery, useModal } from '@reapit/elements'
import { ChangePasswordForm } from './change-password-form'
import { Controls } from '../page/controls'

export const SettingsPasswordPage: FC = () => {
  const { isMobile } = useMediaQuery()
  const { Modal, openModal, closeModal } = useModal()
  return (
    <>
      <FlexContainer isFlexJustifyBetween>
        <Title>Password</Title>
        {isMobile && (
          <ButtonGroup alignment="right">
            <Button intent="low" onClick={openModal}>
              Controls
            </Button>
          </ButtonGroup>
        )}
      </FlexContainer>
      {isMobile && (
        <Modal title="Controls">
          <Controls />
          <ButtonGroup alignment="center">
            <Button fixedWidth intent="secondary" onClick={closeModal}>
              Close
            </Button>
          </ButtonGroup>
        </Modal>
      )}
      <ChangePasswordForm />
    </>
  )
}

export default SettingsPasswordPage
