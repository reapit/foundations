import React from 'react'
import { ModalV2, Content, H4 } from '@reapit/elements'

export const AcceptedModal = ({ visible }: { visible: boolean }) => {
  return (
    <ModalV2 visible={visible} closable={false} title={<H4 className="pt-2 pb-2">Success</H4>} isCentered>
      <Content>
        <p>Thank you for confirming your invite to Reapit Foundations.</p>
        <p>
          If you already had a Developer account, you can use your existing credentials to login to the Developers
          Portal. If not, you will shortly receive an email with instructions on setting up your login credentials.
        </p>
      </Content>
    </ModalV2>
  )
}

export default AcceptedModal
