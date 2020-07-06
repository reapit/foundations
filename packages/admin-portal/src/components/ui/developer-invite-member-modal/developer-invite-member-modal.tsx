import * as React from 'react'
import { Modal, ModalProps, SubTitleH6, FlexContainerBasic, Form } from '@reapit/elements'
import { Formik } from 'formik'
import styles from '@/styles/blocks/developer-invite-member.scss?mod'
import { handleSubmit } from './handlers'
import DeveloperInviteMemberModalInput from './developer-invite-member-modal-input'
import DeveloperInviteMemberModalFooter from './developer-invite-member-footer'
import { validationSchema } from './validation-schema'
import { formFields } from './form-fields'

const { developerInviteNameField, developerInviteEmailField, developerInviteMessageField } = formFields

export type DeveloperInviteMemberModalProps = Pick<ModalProps, 'afterClose'> & {
  visible?: boolean
}

export const initialValues = {
  [developerInviteNameField.name]: '',
  [developerInviteEmailField.name]: '',
  [developerInviteMessageField.name]: '',
}

export const DeveloperInviteMemberModal: React.FC<DeveloperInviteMemberModalProps> = ({
  visible = false,
  afterClose,
}) => {
  if (!visible) {
    return null
  }
  return (
    <Modal visible={visible} afterClose={afterClose} title="Invite New Member">
      <>
        <SubTitleH6 className={styles.subTitle}>
          Please enter a name and email address below to invite a new member to your organisation:
        </SubTitleH6>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
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
