import React from 'react'
import { ModalV2, Content } from '@reapit/elements'

export const RejectedModal = ({ visible }: { visible: boolean }) => {
  return (
    <ModalV2 visible={visible} title="Invitation Declined" isCentered isResponsive>
      <Content>
        <p>You have successfully declined the invitation to Reapit Foundations.</p>
      </Content>
    </ModalV2>
  )
}

export default RejectedModal
