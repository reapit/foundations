import * as React from 'react'
import { Modal, ModalProps, SubTitleH5, FlexContainerBasic, Form } from '@reapit/elements'
import { Formik } from 'formik'
import styles from '@/styles/blocks/developer-invite-member.scss?mod'
import { FIELD_NAMES } from './constants'
import { validate, handleSubmit } from './handlers'
import DeveloperInviteMemberModalInput from './developer-invite-member-modal-input'
import DeveloperInviteMemberModalFooter from './developer-invite-member-footer'

export type DeveloperInviteMemberModalProps = Pick<ModalProps, 'afterClose'> & {
  visible?: boolean
}

export const initialValues = {
  [FIELD_NAMES.NAME]: '',
  [FIELD_NAMES.EMAIL]: '',
  [FIELD_NAMES.MESSAGE]: '',
}

export const DeveloperInviteMemberModal: React.FC<DeveloperInviteMemberModalProps> = ({
  visible = false,
  afterClose,
}) => {
  return (
    <Modal visible={visible} afterClose={afterClose} title="Invite New Member">
      <>
        <SubTitleH5 className={styles.subTitle}>
          Please enter a name and email address below to invite a new member to your organisation:
        </SubTitleH5>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
          {({ handleSubmit: handleSubmitForm }) => (
            <Form className="form" onSubmit={handleSubmitForm}>
              <FlexContainerBasic hasBackground hasPadding flexColumn>
                <DeveloperInviteMemberModalInput />
                <DeveloperInviteMemberModalFooter afterClose={afterClose} />
              </FlexContainerBasic>
            </Form>
          )}
        </Formik>
      </>
    </Modal>
  )
}

export default DeveloperInviteMemberModal
