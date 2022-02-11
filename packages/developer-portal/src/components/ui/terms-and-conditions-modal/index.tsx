import * as React from 'react'
import { Button, Modal, ModalProps } from '@reapit/elements-legacy'
import { TermsAndConditions } from './terms-and-conditions'
import { ScheduleOne } from './schedule-one'
import { ScheduleTwo } from './schedule-two'
import { modalWidth } from './__styles__/terms-and-conditions'
import { ScheduleThree } from './schedule-three'
import { BodyText, elMb6, PersistantNotification } from '@reapit/elements'

export type TermsAndConditionsModalProps = {
  onAccept: () => void
  onDecline?: () => void
  tapOutsideToDissmiss?: boolean
  isSubmitting?: boolean
} & Pick<ModalProps, 'visible' | 'afterClose'>

export const TermsAndConditionsModal: React.FunctionComponent<TermsAndConditionsModalProps> = ({
  visible = true,
  afterClose,
  onAccept,
  onDecline,
  tapOutsideToDissmiss = true,
  isSubmitting,
}) => {
  return (
    <Modal
      className={modalWidth}
      title="Terms and Conditions"
      size="medium"
      visible={visible}
      afterClose={afterClose}
      tapOutsideToDissmiss={tapOutsideToDissmiss}
      footerItems={
        <>
          {onDecline && (
            <Button variant="secondary" type="button" onClick={onDecline}>
              Decline
            </Button>
          )}
          <Button dataTest="buttonAcceptTermsAndConditions" loading={isSubmitting} onClick={onAccept}>
            Accept
          </Button>
        </>
      }
    >
      <>
        <BodyText hasGreyText>
          These Reapit Foundations User Terms and Conditions govern access to Reapit’s Foundations Platform and
          incorporate the Registration Details, to the exclusion of all other terms.
        </BodyText>
        <PersistantNotification className={elMb6} intent="secondary" isExpanded isFullWidth>
          Please agree to the Reapit Developer Terms and Conditions to proceed
        </PersistantNotification>
        <TermsAndConditions />
        <ScheduleOne />
        <ScheduleTwo />
        <ScheduleThree />
      </>
    </Modal>
  )
}

export default TermsAndConditionsModal
