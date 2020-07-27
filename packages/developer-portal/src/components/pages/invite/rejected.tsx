import React from 'react'
import { ModalV2, Content, H4 } from '@reapit/elements'

export const RejectedModal = ({ visible }: { visible: boolean }) => {
  return (
    <ModalV2 visible={visible} closable={false} title={<H4 className="pt-2 pb-2">Invitation Declined</H4>} isCentered>
      <Content>
        <p>You have successfully declined the invitation to Reapit Foundations.</p>
      </Content>
    </ModalV2>
  )
}

export default RejectedModal
