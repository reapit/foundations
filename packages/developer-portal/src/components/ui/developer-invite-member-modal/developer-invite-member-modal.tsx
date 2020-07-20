import * as React from 'react'
import { ModalV2, ModalPropsV2, SubTitleH6, FlexContainerBasic, Form, Button, Input, TextArea } from '@reapit/elements'
import { Formik } from 'formik'
import { validationSchema } from './validation-schema'
import { formFields } from './form-fields'

const { developerInviteNameField, developerInviteEmailField, developerInviteMessageField } = formFields

export type InviteMemberModalProps = ModalPropsV2 & {
  visible?: boolean
}

export const initialValues = {
  [developerInviteNameField.name]: '',
  [developerInviteEmailField.name]: '',
  [developerInviteMessageField.name]: '',
}

export const InviteMemberModalInput: React.FC = () => {
  return (
    <>
      <Input
        id={developerInviteNameField.name}
        type="text"
        placeholder={developerInviteNameField.placeHolder}
        name={developerInviteNameField.name}
        required
        labelText={developerInviteNameField.label as string}
      />
      <Input
        id={developerInviteEmailField.name}
        type="email"
        placeholder={developerInviteEmailField.placeHolder}
        name={developerInviteEmailField.name}
        required
        labelText={developerInviteEmailField.label as string}
      />
      <TextArea
        id={developerInviteMessageField.name}
        placeholder={developerInviteMessageField.placeHolder}
        name={developerInviteMessageField.name}
        labelText={developerInviteMessageField.label as string}
      />
    </>
  )
}

export const handleSubmit = values => {
  // TBC
  console.log('submit', values)
}

export const InviteMemberModal: React.FC<InviteMemberModalProps> = ({ visible = false, onClose }) => {
  if (!visible) {
    return null
  }
  return (
    <ModalV2
      visible={visible}
      onClose={onClose}
      title="Invite New Member"
      footer={
        <>
          <Button variant="secondary" type="button" onClick={onClose as () => void}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Send Invite
          </Button>
        </>
      }
    >
      <>
        <SubTitleH6 className="px-4">
          Please enter a name and email address below to invite a new member to your organisation:
        </SubTitleH6>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({ handleSubmit: handleSubmitForm }) => (
            <Form className="form" onSubmit={handleSubmitForm}>
              <FlexContainerBasic hasBackground hasPadding flexColumn>
                <InviteMemberModalInput />
              </FlexContainerBasic>
            </Form>
          )}
        </Formik>
      </>
    </ModalV2>
  )
}

export default InviteMemberModal
