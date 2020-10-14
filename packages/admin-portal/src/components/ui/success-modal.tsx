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
          Admin status for ‘<strong>{name}</strong>’ has successfully been updated
        </p>
      </Content>
    </ModalV2>
  )
}

export default SuccessModal
