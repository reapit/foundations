import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@reapit/elements'

export interface ConfirmModalProps {
  visible: boolean
  title?: string
  subtitle?: string
  onCancel?: () => void
  onConfirm?: () => void
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible = false,
  title = 'Confirm',
  subtitle = 'Are you sure?',
  onCancel,
  onConfirm,
}) => {
  if (!visible) return null
  return (
    <Modal visible renderChildren afterClose={onCancel}>
      <>
        <ModalHeader title={title}></ModalHeader>
        <ModalBody body={<p>{subtitle}</p>} />
        <ModalFooter
          footerItems={
            <>
              <Button className="mr-2" type="button" onClick={onCancel} variant="danger" fullWidth={true}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" fullWidth={true} onClick={onConfirm}>
                Confirm
              </Button>
            </>
          }
        />
      </>
    </Modal>
  )
}

export default ConfirmModal
