import React, { FC, useEffect } from 'react'
import { TermsAndConditions } from './terms-and-conditions'
import { ScheduleOne } from './schedule-one'
import { ScheduleTwo } from './schedule-two'
import { modalWidth } from './__styles__/terms-and-conditions'
import { ScheduleThree } from './schedule-three'
import { BodyText, Button, ButtonGroup, elMb6, PersistentNotification, useModal } from '@reapit/elements'

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
  useEffect(handleOpenCloseModal(openModal, closeModal, visible), [visible])
  return (
    <Modal className={modalWidth} title="Terms and Conditions">
      <>
        <BodyText hasGreyText>
          These Reapit Foundations User Terms and Conditions govern access to Reapit’s Foundations Platform and
          incorporate the Registration Details, to the exclusion of all other terms.
        </BodyText>
        <PersistentNotification className={elMb6} intent="primary" isExpanded isFullWidth isInline>
          Please agree to the Reapit Developer Terms and Conditions to proceed
        </PersistentNotification>
        <TermsAndConditions />
        <ScheduleOne />
        <ScheduleTwo />
        <ScheduleThree />
        <ButtonGroup alignment="right">
          {onDecline && (
            <Button fixedWidth intent="low" type="button" onClick={onDecline}>
              Decline
            </Button>
          )}
          <Button fixedWidth intent="primary" loading={isSubmitting} disabled={isSubmitting} onClick={onAccept}>
            Accept
          </Button>
        </ButtonGroup>
      </>
    </Modal>
  )
}

export default TermsAndConditionsModal
