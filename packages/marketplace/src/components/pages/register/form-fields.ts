import { FormFieldInfo } from '@reapit/utils'

export type FieldKey = 'nameField' | 'companyNameField' | 'emailField' | 'telephoneField'

export const formFields: Record<FieldKey, FormFieldInfo> = {
  nameField: {
    name: 'name',
    label: 'Full name',
    placeHolder: 'Joe Developer',
    errorMessage: 'Invalid full name',
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
}
