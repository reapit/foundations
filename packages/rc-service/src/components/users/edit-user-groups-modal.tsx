import { useModal, Button, Modal, Icon } from '@reapit/elements'
import React, { FC } from 'react'
import { EditUserGroups, EditUserGroupsProps } from './edit-user-groups'
import styled from 'styled-components'

const InlineIcon = styled(Icon)`
  margin-right: 0 !important;
`

export const EditUserGroupsModal: FC<EditUserGroupsProps> = (props) => {
  const { modalIsOpen, openModal, closeModal } = useModal()

  return (
    <>
      <Button buttonSize="small" intent="neutral" onClick={openModal}>
        <InlineIcon icon="edit" />
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
