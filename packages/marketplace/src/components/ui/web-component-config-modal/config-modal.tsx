import * as React from 'react'
import { Modal } from '@reapit/elements'
import { WebComponentConfigModalInner } from './config-modal-inner'

export type WebComponentModalProps = {
  afterClose: () => void
  closeModal: () => void
}

export const WebComponentModal = ({ afterClose, closeModal }: WebComponentModalProps) => {
  return (
    <Modal visible renderChildren afterClose={afterClose}>
      <WebComponentConfigModalInner closeModal={closeModal} />
    </Modal>
  )
}
export default WebComponentModal
