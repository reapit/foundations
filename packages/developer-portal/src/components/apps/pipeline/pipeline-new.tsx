import React, { FC } from 'react'
import { Button, ButtonGroup, MobileControls, Title, useMediaQuery, useModal } from '@reapit/elements'
import { PipelineConfigure } from './pipeline-configure'
import { Helper } from '../page/helper'

export const PipelineNew: FC = () => {
  const { isMobile } = useMediaQuery()
  const { Modal, openModal, closeModal } = useModal()

  return (
    <>
      <Title>New Pipeline</Title>
      {isMobile && (
        <Modal title="Controls">
          <Helper />
          <ButtonGroup alignment="right">
            <Button intent="default" onClick={closeModal}>
              Close
            </Button>
          </ButtonGroup>
        </Modal>
      )}
      <PipelineConfigure />
      <MobileControls buttonOnClick={openModal} />
    </>
  )
}
