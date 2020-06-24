import { FormFieldInfo } from '@reapit/utils'

export type FieldKey = 'developerInviteNameField' | 'developerInviteEmailField' | 'developerInviteMessageField'

export const formFields: Record<FieldKey, FormFieldInfo> = {
  developerInviteNameField: {
    name: 'developerInviteName',
    label: 'Name',
    placeHolder: 'Name',
    errorMessage: 'Invalid Name',
  },
  developerInviteEmailField: {
    name: 'developerInviteEmail',
    label: 'Email',
    placeHolder: 'Email',
    errorMessage: 'Invalid Email',
  },
  developerInviteMessageField: {
    name: 'developerInviteMessage',
    label: 'Message (Optinal)',
    placeHolder: 'Message',
  },
}
