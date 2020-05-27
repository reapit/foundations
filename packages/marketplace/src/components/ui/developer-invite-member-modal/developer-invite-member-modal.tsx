import * as React from 'react'
import { Modal, ModalProps, SubTitleH5 } from '@reapit/elements'
import DeveloperInviteMemberModalInner from './developer-invite-member-modal-inner'

export type DeveloperInviteMemberModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & {}

export const DeveloperInviteMemberModal: React.FC<DeveloperInviteMemberModalProps> = ({
  visible = false,
  afterClose,
}) => {
  return (
    <Modal visible={visible} afterClose={afterClose} title="Invite New Member">
      <SubTitleH5>Please enter a name and email address below to invite a new member to your organisation:</SubTitleH5>
      <DeveloperInviteMemberModalInner />
    </Modal>
  )
}

export default DeveloperInviteMemberModal
