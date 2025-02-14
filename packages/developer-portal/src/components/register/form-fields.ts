import { FormFieldInfo } from '@reapit/utils-common'

export type FieldKey =
  | 'nameField'
  | 'companyNameField'
  | 'emailField'
  | 'telephoneField'
  | 'gitHubUsernameField'
  | 'jobTitleField'

export const formFields: Record<FieldKey, FormFieldInfo> = {
  nameField: {
    name: 'name',
    label: 'Full name',
    placeHolder: 'Joe Developer',
    errorMessage: 'Invalid full name',
  },
  jobTitleField: {
    name: 'jobTitle',
    label: 'Job Title',
    placeHolder: 'Developer',
    errorMessage: 'Invalid Job Title',
  },
  companyNameField: {
    label: 'Company name',
    name: 'companyName',
    placeHolder: 'Acme Industries Ltd',
  },
  emailField: {
    name: 'email',
    label: 'Email',
    placeHolder: 'name@address.com',
    errorMessage: 'Invalid email',
  },
  telephoneField: {
    name: 'telephone',
    label: 'Telephone',
    placeHolder: '0800 800 800',
    errorMessage: 'Invalid phone number',
  },
  gitHubUsernameField: {
    name: 'gitHubUsername',
    label: 'GitHub Username',
    placeHolder: 'Gihub handle',
    errorMessage: 'Invalid GitHub Username',
  },
}
