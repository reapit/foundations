import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@reapit/elements'

export interface SetAsAdminModalProps {
  visible: boolean
  username: string
}

export const SetAsAdminModal: React.FunctionComponent<SetAsAdminModalProps> = ({ visible, username }) => {
  return (
    <Modal visible={visible} renderChildren>
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
              <Button variant="secondary" fullWidth>
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
