import * as React from 'react'
import { Button, Modal, ModalProps, H4, H6 } from '@reapit/elements'
import styles from '@/styles/blocks/term-and-conditions-modal.scss?mod'
import { TermAndConditions } from './term-and-conditions'
import { Schedule1 } from './schedule1'
import { Schedule2 } from './schedule2'

export type TermsAndConditionsModalProps = {
  onAccept: () => void
  onDecline?: () => void
  tapOutsideToDissmiss?: boolean
} & Pick<ModalProps, 'visible' | 'afterClose'>

export const TermsAndConditionsModal: React.FunctionComponent<TermsAndConditionsModalProps> = ({
  visible,
  afterClose,
  onAccept,
  onDecline,
  tapOutsideToDissmiss = true,
}) => {
  return (
    <Modal
      title="Terms and Conditions"
      size="medium"
      visible={true}
      afterClose={afterClose}
      tapOutsideToDissmiss={tapOutsideToDissmiss}
      footerItems={
        <>
          {onDecline && (
            <Button variant="secondary" type="button" onClick={onDecline}>
              Decline
            </Button>
          )}
          <Button dataTest="buttonAcceptTermsAndConditions" variant="primary" type="button" onClick={onAccept}>
            Accept
          </Button>
        </>
      }
    >
      <React.Fragment>
        <p className={styles['heading-paragraph']}>
          These Reapit Foundations User Terms and Conditions govern access to Reapit’s Foundations Platform and
          incorporate the Registration Details.
        </p>
        <p className={styles['heading-paragraph']}>
          Reapit reserves the right to amend these Application User Terms and Conditions at any time by notice to the
          Developer.
        </p>
        <TermAndConditions />
        <Schedule1 />
        <Schedule2 />
      </React.Fragment>
    </Modal>
  )
}

export default TermsAndConditionsModal
