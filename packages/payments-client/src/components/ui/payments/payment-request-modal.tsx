import React from 'react'
import { Button, Section, ModalV2, H5, Content } from '@reapit/elements'
export type PaymentRequestModalProps = {
  isShowConfirmModal: boolean
  setRequestPaymentId: React.Dispatch<React.SetStateAction<string>>
  requestPaymentId: string
}

export const PaymentRequestModal: React.FC<PaymentRequestModalProps> = ({
  isShowConfirmModal,
  setRequestPaymentId,
  requestPaymentId,
}) => {
  const handleOnClose = () => setRequestPaymentId('')
  return (
    <ModalV2 visible={isShowConfirmModal} destroyOnClose={true} onClose={handleOnClose}>
      <Content>
        <H5>Are you sure you want to request this payment?</H5>
        <Section isFlex hasPadding={false} hasMargin={false}>
          <Button variant="info" onClick={handleOnClose} type="button">
            Cancel
          </Button>
        </Section>
      </Content>
    </ModalV2>
  )
}

export default PaymentRequestModal
