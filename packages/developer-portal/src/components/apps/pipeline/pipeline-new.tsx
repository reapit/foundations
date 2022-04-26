import React, { FC } from 'react'
import { Button, ButtonGroup, FlexContainer, Title, useMediaQuery, useModal } from '@reapit/elements'
import { PipelineConfigure } from './pipeline-configure'
import { Helper } from '../page/helper'

export const PipelineNew: FC = () => {
  const { isMobile } = useMediaQuery()
  const { Modal, openModal, closeModal } = useModal()

  return (
    <>
      <FlexContainer isFlexJustifyBetween>
        <Title>New Pipeline</Title>
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
          <Helper />
          <ButtonGroup alignment="center">
            <Button fixedWidth intent="secondary" onClick={closeModal}>
              Close
            </Button>
          </ButtonGroup>
        </Modal>
      )}
      <PipelineConfigure />
    </>
  )
}
