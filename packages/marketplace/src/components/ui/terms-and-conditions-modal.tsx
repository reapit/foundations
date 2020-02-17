import * as React from 'react'
import { Button, Modal, ModalProps, H4, H6 } from '@reapit/elements'
import styles from '@/styles/blocks/term-and-conditions-modal.scss?mod'

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
          <Button dataTest="buttonAcceptTermsAndConditions" variant="primary" type="button" onClick={onAccept}>
            Accept
          </Button>
        </>
      }
    >
      <React.Fragment>
        <H4 className={styles.title}>SANDBOX TERMS OF USE FOR THE REAPIT FOUNDATIONS PLATFORM</H4>
        <ol className={styles['parent']}>
          <li className={styles['child']}>
            <H6>General</H6>
            <ol className={styles['parent']}>
              <li className={styles['child']}>
                These Terms of Use (<b>Terms</b>) govern Your access to the Foundations Developer Portal (Portal) and
                Use of the self-serve tools. The Terms shall have effect during the Alpha Stage and Reapit reserves the
                right to amend these Terms unilaterally upon written notice to You at any time.{' '}
              </li>
              <li className={styles['child']}>
                These Terms and any dispute arising in relation to these Terms shall be governed by English law and the
                English courts shall have exclusive jurisdiction to resolve any disputes in relation to these Terms.
              </li>
              <li className={styles['child']}>
                In these Terms, the following defined terms are used:
                <ol className={styles['parent']}>
                  <li className={styles['child']}>
                    <b>Alpha Stage</b> means the initial period of access to the Portal for the first users.
                  </li>
                  <li className={styles['child']}>
                    <b>Application/App</b> means a software application available to (or intended to be available to) a
                    customer of Reapit from the Reapit Marketplace.
                  </li>
                  <li className={styles['child']}>
                    <b>Beta Stage</b> means the period of access to the Portal which commences automatically upon expiry
                    of the Alpha Stage, pursuant to clause 3.2 below.
                  </li>
                  <li className={styles['child']}>
                    <b>Reapit</b> means Reapit Limited, registered in England (registered number 03483017) whose
                    registered office is at 67 – 74 Saffron Hill, London, EC1N 8QX.
                  </li>
                  <li className={styles['child']}>
                    <b>Reapit Marketplace</b> means Reapit’s online directory of software applications which interact
                    with Reapit’s proprietary software.
                  </li>
                  <li className={styles['child']}>
                    <b>Use</b> is defined in clause 2, below.
                  </li>
                  <li className={styles['child']}>
                    <b>You/Your</b> means the entity (whether individual or a business) which accesses this Portal
                    pursuant to entering into a Developer Agreement with Reapit.
                  </li>
                </ol>
              </li>
            </ol>
          </li>

          <li className={styles['child']}>
            <H6>USE</H6>
            <ol className={styles['parent']}>
              <li className={styles['child']}>
                Upon (and subject to) entering into a Developer Agreement and accepting these Terms You are permitted
                (subject to the terms of clause 6, to:
                <ol className={styles['parent']}>
                  <li className={styles['child']}>
                    access documentation for, and manage Your access to Reapit’s APIs; and
                  </li>
                  <li className={styles['child']}>
                    create and manage Apps, which if approved by Reapit, can be marketed within the Reapit Marketplace,
                    subject to any terms in force at the time in relation to the marketing of Applications.
                  </li>
                </ol>
              </li>
            </ol>
          </li>

          <li className={styles['child']}>
            <H6>EARLY APP DEVELOPERS</H6>
            <ol className={styles['parent']}>
              <li className={styles['child']}>
                If You have been invited by Reapit to be an Early App Developer and have accepted that invitation,
                Reapit will support the development of Your Application with marketing activities, which will be
                determined at Reapit’s discretion, but which may include being featured on Reapit’s website in the{' '}
                <i>Available Apps </i>
                section, as well as being included in Reapit’s press release(s), industry mailshots and in all
                Foundations marketing to Reapit’s customers.
              </li>
            </ol>
          </li>

          <li className={styles['child']}>
            <H6>ACCESS</H6>
            <ol className={styles['parent']}>
              <li className={styles['child']}>
                Notwithstanding any other provision in these Terms, Your access to the Portal is conditional on Your
                compliance with these Terms and Reapit reserves the right to terminate Your access at any time, by
                written notice to You, if Reapit believes that You have breached these Terms.
              </li>
              <li className={styles['child']}>
                During the Alpha Stage, the duration of which Reapit can determine at its sole discretion, Your access
                to the Portal is free of charge.
              </li>
              <li className={styles['child']}>
                Reapit will notify you at least 10 days before the expiry of the Alpha Stage, such notice to include the
                amendments to be made to these Terms in relation to the Beta Stage.
              </li>
              <li className={styles['child']}>
                If You wish to continue to use the Portal after the Alpha Stage, You will be required to re-register and
                expressly accept the amended Terms, which may, at Reapit’s sole discretion, include charges for access
                to the Portal.
              </li>
            </ol>
          </li>

          <li className={styles['child']}>
            <H6>FEEDBACK</H6>
            <ol className={styles['parent']}>
              <li className={styles['child']}>
                In consideration of Your free Use of the Portal, Reapit requires You to provide regular feedback to
                Reapit, to help Reapit improve the Portal and its features. Reapit will (in addition to any other mode
                of feedback requested by Reapit from time to time):
                <ol className={styles['parent']}>
                  <li className={styles['child']}>schedule weekly calls with Reapit’s product owners; and</li>
                  <li className={styles['child']}>
                    provide a form within the Portal “Help” section to provide Your feedback.
                  </li>
                </ol>
              </li>
              <li className={styles['child']}>
                If You want access to the API documentation, but You are not ready to provide feedback when requested,
                or if You do not immediately intend to use the Portal to develop an Application, then You must wait for
                the Beta Stage to commence before You can Use the Portal.
              </li>
            </ol>
          </li>

          <li className={styles['child']}>
            <H6>RESTRICTIONS</H6>
            <ol className={styles['parent']}>
              <li className={styles['child']}>
                6.1 During the Alpha Stage You should not, without Reapit’s prior consent, or unless You are an Early
                App Developer in accordance with clause 3.1:
                <ol className={styles['parent']}>
                  <li className={styles['child']}>
                    develop production applications, third-party or internal integrations; or
                  </li>
                  <li className={styles['child']}>use the APIs in a live environment.</li>
                </ol>
              </li>
              <li className={styles['child']}>
                During the Alpha Stage, You must not share Your log-in details to the Portal with anybody who is not an
                employee of Your business. If You wish to share access to the Portal within Your business, You must
                notify Reapit in writing at Reapit Ltd, 67 - 74 Saffron Hill Third Floor, London EC1N 8QX, with details
                of the individual(s) who You wish to share access with. Reapit shall have the right to withhold consent
                to such sharing at its sole discretion. You will be solely responsible for any act or omission of any
                individual with whom You share access.
              </li>
              <li className={styles['child']}>
                You must not, and You must permit any third party to, store, transmit, display or process the following
                as part of, or related to, Your Use of the Portal any material or data which:
                <ol className={styles['parent']}>
                  <li className={styles['child']}>
                    infringes or misappropriates a third party’s intellectual property or proprietary rights;
                  </li>
                  <li className={styles['child']}>
                    is hate-related or violent, and/or supports or encourages discrimination against individuals or
                    groups;
                  </li>
                  <li className={styles['child']}>
                    is obscene, excessively profane or otherwise objectionable material;
                  </li>
                  <li className={styles['child']}>
                    advocates, supports or advances criminal hacking, cracking, or phishing;
                  </li>
                  <li className={styles['child']}>is related to illegal drugs or paraphernalia;</li>
                  <li className={styles['child']}>is malicious;</li>
                  <li className={styles['child']}>is unlawful software;</li>
                  <li className={styles['child']}>
                    is itself or incorporates malicious code, such as viruses, worms, time bombs, Trojan horses and
                    other harmful or malicious files, scripts, agents or programs; and/or
                  </li>
                  <li className={styles['child']}>
                    violates, encourages or furthers conduct that would violate any applicable laws, including any
                    criminal laws, or any third-party rights, including publicity or privacy rights.
                  </li>
                </ol>
              </li>
              <li className={styles['child']}>
                You may not Use the Portal to:
                <ol className={styles['parent']}>
                  <li className={styles['child']}>send any unsolicited or unlawful communications;</li>
                  <li className={styles['child']}>
                    data mine or harvest any personal information of other users of the Portal; and/or
                  </li>
                  <li className={styles['child']}>
                    infringe a third party’s intellectual property rights or other proprietary rights.
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li className={styles['child']}>
            <H6>DATA PROTECTION</H6>
            <ol className={styles['parent']}>
              <li className={styles['child']}>
                As part of Your access to and use of the Portal, Reapit will capture the following data, some of which
                is personal data:
                <ol className={styles['parent']}>
                  <li className={styles['child']}>first name, family name;</li>
                  <li className={styles['child']}>company name, company address and company website;</li>
                  <li className={styles['child']}>job title;</li>
                  <li className={styles['child']}>business telephone number; and</li>
                  <li className={styles['child']}>business e-mail address.</li>
                </ol>
              </li>
              <li className={styles['child']}>
                Any personal data collected by Reapit will be treated in compliance with all applicable data protection
                law and will not be shared with any third party, other than as required to give You the benefit of Your
                use of the Portal.{' '}
              </li>
            </ol>
          </li>
          <li className={styles['child']}>
            <H6>LIABILITY</H6>
            <ol className={styles['parent']}>
              <li className={styles['child']}>
                As long as access to the Portal is free of charge (whether during the Alpha Stage or thereafter), Reapit
                excludes any and all liability to You, arising out of or related to Your access to and/or Use of the
                Portal, other than any liability that Reapit cannot exclude by law.
              </li>
              <li className={styles['child']}>
                You acknowledge and agree that free access to the Portal is of benefit to You and accordingly You waive
                Your right to claim any damages, charges, expenses or any monetary amounts from Reapit, as a result of
                or related to Your access to and/or Use of the Portal.
              </li>
              <li className={styles['child']}>
                You agree to indemnify Reapit on demand for:
                <ol className={styles['parent']}>
                  <li className={styles['child']}>any breach by You of these Terms; and/or</li>
                  <li className={styles['child']}>
                    any breach by You of Reapit’s intellectual property rights; and/or
                  </li>
                  <li className={styles['child']}>
                    any claim by a third party that You have breached that third party’s intellectual property rights in
                    relation to Your use of the Portal.
                  </li>
                </ol>
              </li>
            </ol>
          </li>
        </ol>
      </React.Fragment>
    </Modal>
  )
}

export default TermsAndConditionsModal
