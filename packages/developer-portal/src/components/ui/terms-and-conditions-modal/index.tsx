import * as React from 'react'
import { Button, Modal, ModalProps } from '@reapit/elements'
import { TermAndConditions } from './term-and-conditions'
import { Schedule1 } from './schedule1'
import { Schedule2 } from './schedule2'
import { headingParagraph } from './__styles__/termsAndConditionsModal'

export type TermsAndConditionsModalProps = {
  onAccept: () => void
  onDecline?: () => void
  tapOutsideToDissmiss?: boolean
  isSubmitting?: boolean
} & Pick<ModalProps, 'visible' | 'afterClose'>

export const TermsAndConditionsModal: React.FunctionComponent<TermsAndConditionsModalProps> = ({
  visible,
  afterClose,
  onAccept,
  onDecline,
  tapOutsideToDissmiss = true,
  isSubmitting,
}) => {
  return (
    <Modal
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
      <React.Fragment>
        <p className={headingParagraph}>
          These Reapit Foundations User Terms and Conditions govern access to Reapit’s Foundations Platform and
          incorporate the Registration Details, to the exclusion of all other terms.
        </p>
        <TermAndConditions />
        <Schedule1 />
        <Schedule2 />
      </React.Fragment>
    </Modal>
  )
}

export default TermsAndConditionsModal
