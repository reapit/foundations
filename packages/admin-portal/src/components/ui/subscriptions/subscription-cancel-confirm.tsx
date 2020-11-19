import React, { useEffect } from 'react'
import { Button, Section, ModalV2, H5 } from '@reapit/elements'
export type CancelConfirmModalProps = {
  onConfirm: () => void
  isShowConfirmModal: boolean
  setCancelSubId: React.Dispatch<React.SetStateAction<string>>
  isCanceling: boolean
}

export const CancelConfirmModal: React.FC<CancelConfirmModalProps> = ({
  onConfirm,
  isShowConfirmModal,
  setCancelSubId,
  isCanceling,
}) => {
  useEffect(() => {
    console.log(isCanceling)
    if (!isCanceling) {
      setCancelSubId('')
    }
  }, [isCanceling])

  const handleOnClose = () => setCancelSubId('')
  return (
    <ModalV2 visible={isShowConfirmModal} destroyOnClose={true} onClose={handleOnClose}>
      <H5>Are you sure you want to cancel this appointment?</H5>
      <Section isFlex hasPadding={false} hasMargin={false}>
        <Button variant="info" loading={isCanceling} onClick={onConfirm} type="button">
          Yes
        </Button>
        <Button variant="info" disabled={isCanceling} onClick={handleOnClose} type="button">
          No
        </Button>
      </Section>
    </ModalV2>
  )
}

export default CancelConfirmModal
