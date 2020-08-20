import React from 'react'
import { Content, ModalV2, Button } from '@reapit/elements'

export type SuccessModalProps = {
  name?: string
  onClose?: () => void
}

export const SuccessModal: React.FunctionComponent<SuccessModalProps> = ({ name, onClose }) => {
  if (!name) return null
  return (
    <ModalV2
      visible
      title="Success"
      closable={false}
      isCentered
      footer={
        <Button className="mr-2" key="close" type="button" onClick={onClose}>
          Close
        </Button>
      }
    >
      <Content>
        <p>
          ‘<strong>{name}</strong>’ has been successfully set as an Admin of your organisation
        </p>
      </Content>
    </ModalV2>
  )
}

export default SuccessModal
