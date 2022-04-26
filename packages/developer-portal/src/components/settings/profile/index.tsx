import React, { FC } from 'react'
import { Button, ButtonGroup, FlexContainer, Loader, Title, useMediaQuery, useModal } from '@reapit/elements'
import { useGlobalState } from '../../../core/use-global-state'
import { ProfileForm } from './profile-form'
import { Controls } from '../page/controls'

export const SettingsProfilePage: FC = () => {
  const { globalDataState } = useGlobalState()
  const { isMobile } = useMediaQuery()
  const { Modal, openModal, closeModal } = useModal()
  const { currentMember } = globalDataState

  return (
    <>
      <FlexContainer isFlexJustifyBetween>
        <Title>Profile</Title>
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
      {!currentMember ? <Loader /> : <ProfileForm />}
    </>
  )
}

export default SettingsProfilePage
