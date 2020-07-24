import React from 'react'
import { ModalV2, Content } from '@reapit/elements'

export const RejectedModal = ({ visible }: { visible: boolean }) => {
  return (
    <ModalV2
      visible={visible}
      closable={false}
      title={<h4 className="modal-card-title is-4 pt-2 pb-2">Invitation Declined</h4>}
      isCentered
    >
      <Content>
        <p>You have successfully declined the invitation to Reapit Foundations.</p>
      </Content>
    </ModalV2>
  )
}

export default RejectedModal
