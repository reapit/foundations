import React, { FC, useEffect, useState } from 'react'
import { modalWidth } from './__styles__/terms-and-conditions'
import { BodyText, Button, ButtonGroup, elMb6, PersistentNotification, useModal } from '@reapit/elements'
import { TermsAndConditionsPdf } from './terms-and-conditions-pdf'

export type TermsAndConditionsModalProps = {
  onAccept: () => void
  onDecline?: () => void
  isSubmitting?: boolean
  visible: boolean
}

export const handleOpenCloseModal = (openModal: () => void, closeModal: () => void, visible: boolean) => () => {
  if (visible) openModal()
  else closeModal()
}

export const TermsAndConditionsModal: FC<TermsAndConditionsModalProps> = ({
  onAccept,
  onDecline,
  isSubmitting,
  visible,
}) => {
  const { Modal, openModal, closeModal } = useModal()

  // Manage acceptance button state. The accept button should
  // only be enabled if the PDF loads successfully
  const [pdfLoaded, setPdfLoaded] = useState(false)

  const finalisePdfLoad = () => {
    setPdfLoaded(true)
  }

  useEffect(handleOpenCloseModal(openModal, closeModal, visible), [visible])
  return (
    <Modal className={modalWidth} title="Terms and Conditions" onModalClose={() => null}>
      <>
        <BodyText hasGreyText>
          These Reapit Foundations User Terms and Conditions govern access to Reapit’s Foundations Platform and
          incorporate the Registration Details, to the exclusion of all other terms.
        </BodyText>
        <PersistentNotification className={elMb6} intent="primary" isExpanded isFullWidth isInline>
          Please agree to the Reapit Developer Terms and Conditions to proceed
        </PersistentNotification>
        <TermsAndConditionsPdf finalisePdfLoad={finalisePdfLoad} />
        <ButtonGroup alignment="right">
          {onDecline && (
            <Button intent="danger" type="button" onClick={onDecline}>
              Decline
            </Button>
          )}
          <Button intent="primary" loading={isSubmitting} disabled={isSubmitting || !pdfLoaded} onClick={onAccept}>
            Accept
          </Button>
        </ButtonGroup>
      </>
    </Modal>
  )
}

export default TermsAndConditionsModal
