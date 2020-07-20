import { FormFieldInfo } from '@reapit/utils'

export type FieldKey = 'inviteNameField' | 'inviteEmailField' | 'inviteMessageField'

export const formFields: Record<FieldKey, FormFieldInfo> = {
  inviteNameField: {
    name: 'name',
    label: 'Name',
    placeHolder: 'Name',
    errorMessage: 'Invalid Name',
  },
  inviteEmailField: {
    name: 'email',
    label: 'Email',
    placeHolder: 'Email',
    errorMessage: 'Invalid Email',
  },
  inviteMessageField: {
    name: 'message',
    label: 'Message (Optional)',
    placeHolder: 'Message',
  },
}
