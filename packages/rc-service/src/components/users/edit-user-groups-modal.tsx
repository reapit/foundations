import { useModal, Button, Modal, Icon } from '@reapit/elements'
import React, { FC } from 'react'
import { EditUserGroups, EditUserGroupsProps } from './edit-user-groups'

export const EditUserGroupsModal: FC<EditUserGroupsProps> = (props) => {
  const { modalIsOpen, openModal, closeModal } = useModal()

  return (
    <>
      <Button intent="neutral" onClick={openModal}>
        <Icon icon="edit" />
      </Button>
      <Modal
        title="Edit User Groups"
        isOpen={modalIsOpen}
        onModalClose={() => {
          closeModal()
        }}
      >
        <EditUserGroups {...props} closeModal={closeModal} />
      </Modal>
    </>
  )
}
