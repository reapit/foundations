import * as React from 'react'
import { Modal, ModalProps, SubTitleH5 } from '@reapit/elements'
import DeveloperInviteMemberModalForm from './developer-invite-member-modal-form'
import DeveloperInviteMemberModalFooter from './developer-invite-member-modal-footer'

export type DeveloperInviteMemberModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & {}

export const DeveloperInviteMemberModal: React.FC<DeveloperInviteMemberModalProps> = ({
  visible = false,
  afterClose,
}) => {
  return (
    <Modal visible={visible} afterClose={afterClose} title="Invite New Member">
      <>
        <SubTitleH5>
          Please enter a name and email address below to invite a new member to your organisation:
        </SubTitleH5>
        <DeveloperInviteMemberModalForm />
      </>
    </Modal>
  )
}

export default DeveloperInviteMemberModal
