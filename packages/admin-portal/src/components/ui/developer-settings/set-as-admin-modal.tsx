import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@reapit/elements'

export interface SetAsAdminModalProps {
  visible: boolean
  username: string
  afterClose?: () => void
}

export const SetAsAdminModal: React.FunctionComponent<SetAsAdminModalProps> = ({ visible, username, afterClose }) => {
  if (!visible) return null

  return (
    <Modal visible={visible} renderChildren afterClose={afterClose}>
      <>
        <ModalHeader title="Set as Admin"></ModalHeader>
        <ModalBody
          body={
            <>
              <p>
                Setting another user as an Admin will automatically log you out and will no longer have access to user
                management or accounts
              </p>
              <br />
              <p>Are you sure you want to set ‘{username}’ as an Admin?</p>
            </>
          }
        />
        <ModalFooter
          footerItems={
            <>
              <Button variant="secondary" fullWidth onClick={afterClose}>
                Cancel
              </Button>
              <Button variant="primary" fullWidth>
                Continue
              </Button>
            </>
          }
        />
      </>
    </Modal>
  )
}

export default SetAsAdminModal
