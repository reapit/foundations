import React from 'react'
import { Modal } from '@reapit/elements'
import { SubmitAppWizard } from './submit-app-wizard'
import { ModalProps } from '@/types/core'

export const SubmitAppWizardModal: React.FC<ModalProps> = ({ visible, afterClose }) => {
  if (!visible) {
    return null
  }

  return (
    <Modal afterClose={afterClose} renderChildren visible={true}>
      <SubmitAppWizard afterClose={afterClose} />
    </Modal>
  )
}
