import React from 'react'
import { Button, Section, ModalV2, H5 } from '@reapit/elements'
export type PaymentRequestModalProps = {
  isShowConfirmModal: boolean
  setRequestPaymentId: React.Dispatch<React.SetStateAction<string>>
}

export const PaymentRequestModal: React.FC<PaymentRequestModalProps> = ({
  isShowConfirmModal,
  setRequestPaymentId,
}) => {
  const handleOnClose = () => setRequestPaymentId('')
  return (
    <ModalV2 visible={isShowConfirmModal} destroyOnClose={true} onClose={handleOnClose}>
      <H5>Are you sure you want to cancel this appointment?</H5>
      <Section isFlex hasPadding={false} hasMargin={false}>
        <Button variant="info" onClick={handleOnClose} type="button">
          Cancel
        </Button>
      </Section>
    </ModalV2>
  )
}

export default PaymentRequestModal
