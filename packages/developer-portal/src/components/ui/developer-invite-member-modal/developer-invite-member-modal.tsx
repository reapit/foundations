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
import { selectInviteDeveloperAsOrgMemberLoading } from '@/selector/developers'

const { inviteNameField, inviteEmailField, inviteMessageField, inviteJobTitleField } = formFields

export type InviteMemberModalProps = ModalPropsV2 & {
  developerId: string
  visible?: boolean
  memberData?: any
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
        labelText={inviteNameField.label}
      />
      <Input
        id={inviteEmailField.name}
        type="email"
        placeholder={inviteEmailField.placeHolder}
        name={inviteEmailField.name}
        required
        labelText={inviteEmailField.label}
      />
      <Input
        id={inviteJobTitleField.name}
        type="text"
        placeholder={inviteJobTitleField.placeHolder}
        name={inviteJobTitleField.name}
        required
        labelText={inviteJobTitleField.label}
      />
      <TextArea
        id={inviteMessageField.name}
        placeholder={inviteMessageField.placeHolder}
        name={inviteMessageField.name}
        labelText={inviteMessageField.label}
      />
    </>
  )
}

export const handleSubmit = (dispatch: Dispatch, developerId: string, onClose: () => void) => values => {
  if (!developerId) {
    return
  }
  const params = {
    id: developerId,
    callback: onClose,
    ...values,
  }
  dispatch(inviteDeveloperAsOrgMember(params))
}

export const InviteMemberModal: React.FC<InviteMemberModalProps> = ({
  visible = false,
  onClose,
  developerId,
  memberData,
}) => {
  const dispatch = useDispatch()
  const loading = useSelector(selectInviteDeveloperAsOrgMemberLoading)
  if (!visible) {
    return null
  }

  const initialValues = {
    [inviteNameField.name]: memberData?.name || '',
    [inviteEmailField.name]: memberData?.email || '',
    [inviteJobTitleField.name]: memberData?.jobTitle || '',
    [inviteMessageField.name]: '',
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
                  <Button disabled={loading} variant="secondary" type="button" onClick={onClose as () => void}>
                    Cancel
                  </Button>
                  <Button loading={loading} variant="primary" type="submit">
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
