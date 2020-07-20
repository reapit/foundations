import * as React from 'react'
import {
  ModalV2,
  ModalPropsV2,
  SubTitleH6,
  FlexContainerBasic,
  Form,
  Button,
  Input,
  TextArea,
  LevelRight,
} from '@reapit/elements'
import { Formik } from 'formik'
import { validationSchema } from './validation-schema'
import { formFields } from './form-fields'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { inviteDeveloperAsOrgMember } from '@/actions/developers'
import { selectDeveloperId } from '@/selector/auth'

const { inviteNameField, inviteEmailField, inviteMessageField } = formFields

export type InviteMemberModalProps = ModalPropsV2 & {
  visible?: boolean
}

export const initialValues = {
  [inviteNameField.name]: '',
  [inviteEmailField.name]: '',
  [inviteMessageField.name]: '',
}

export const InviteMemberModalInput: React.FC = () => {
  return (
    <>
      <Input
        id={inviteNameField.name}
        type="text"
        placeholder={inviteNameField.placeHolder}
        name={inviteNameField.name}
        required
        labelText={inviteNameField.label as string}
      />
      <Input
        id={inviteEmailField.name}
        type="email"
        placeholder={inviteEmailField.placeHolder}
        name={inviteEmailField.name}
        required
        labelText={inviteEmailField.label as string}
      />
      <TextArea
        id={inviteMessageField.name}
        placeholder={inviteMessageField.placeHolder}
        name={inviteMessageField.name}
        labelText={inviteMessageField.label as string}
      />
    </>
  )
}

export const handleSubmit = (dispatch: Dispatch, developerId: string, onClose: () => void) => values => {
  const params = {
    id: developerId,
    callback: onClose,
    ...values,
  }
  dispatch(inviteDeveloperAsOrgMember(params))
}

export const InviteMemberModal: React.FC<InviteMemberModalProps> = ({ visible = false, onClose }) => {
  const dispatch = useDispatch()
  const developerId = useSelector(selectDeveloperId)
  if (!visible) {
    return null
  }
  return (
    <ModalV2 visible={visible} onClose={onClose} title="Invite New Member">
      <>
        <SubTitleH6 className="px-4">
          Please enter a name and email address below to invite a new member to your organisation:
        </SubTitleH6>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit(dispatch, developerId, onClose as () => void)}
          validationSchema={validationSchema}
        >
          {({ handleSubmit: handleSubmitForm }) => (
            <Form className="form" onSubmit={handleSubmitForm}>
              <FlexContainerBasic hasBackground hasPadding flexColumn>
                <InviteMemberModalInput />
                <LevelRight>
                  <Button variant="secondary" type="button" onClick={onClose as () => void}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Send Invite
                  </Button>
                </LevelRight>
              </FlexContainerBasic>
            </Form>
          )}
        </Formik>
      </>
    </ModalV2>
  )
}

export default InviteMemberModal
