import * as React from 'react'
import { Modal, ModalProps, SubTitleH5, FlexContainerBasic } from '@reapit/elements'
import DeveloperInviteMemberModalForm from './developer-invite-member-modal-form'
import DeveloperInviteMemberModalFooter from './developer-invite-member-modal-footer'
import { Formik } from 'formik'
import styles from '@/styles/blocks/developer-invite-member.scss?mod'

export type DeveloperInviteMemberModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & {}

export const initialValues = {
  developerInviteName: '',
  developerInviteEmail: '',
  developerInviteMessage: '',
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
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            console.log(values)
          }}
          validate={values => {
            console.log('asdsad')
          }}
        >
          <FlexContainerBasic hasBackground hasPadding flexColumn>
            <DeveloperInviteMemberModalForm />
            <DeveloperInviteMemberModalFooter afterClose={afterClose} />
          </FlexContainerBasic>
        </Formik>
      </>
    </Modal>
  )
}

export default DeveloperInviteMemberModal
