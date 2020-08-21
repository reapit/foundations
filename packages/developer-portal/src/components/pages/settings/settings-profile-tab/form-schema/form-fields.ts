import { FormFieldInfo } from '@reapit/elements'

type FieldContactInformation = 'nameField' | 'jobTitleField'

export const formFieldsContactInfomation: Record<FieldContactInformation, FormFieldInfo> = {
  nameField: {
    name: 'name',
    label: 'Full Name',
    errorMessage: 'Full name is not valid',
  },
  jobTitleField: {
    name: 'jobTitle',
    label: 'Job Title',
    errorMessage: 'Job title is not valid',
  },
}

type FieldChangePassword = 'currentPasswordField' | 'passwordField' | 'confirmPasswordField'

export const formFieldsChangePassword: Record<FieldChangePassword, FormFieldInfo> = {
  currentPasswordField: {
    name: 'currentPassword',
    label: 'Current Password',
  },
  passwordField: {
    name: 'password',
    label: 'Password',
    errorMessage:
      'Your Password should be a minimum of 8 characters; must contain at least one lowercase letter, one uppercase letter and one number.',
  },
  confirmPasswordField: {
    name: 'confirmPassword',
    label: 'Confirm Password',
  },
}
