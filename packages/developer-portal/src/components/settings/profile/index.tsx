import React, { FC } from 'react'
import { Button, ButtonGroup, Loader, MobileControls, Title, useMediaQuery, useModal } from '@reapit/elements'
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
      <Title>Profile</Title>
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
      {!currentMember ? <Loader /> : <ProfileForm />}
      <MobileControls onClick={openModal} />
    </>
  )
}

export default SettingsProfilePage
