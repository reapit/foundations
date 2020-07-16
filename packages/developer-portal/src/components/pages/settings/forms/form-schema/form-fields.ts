import { FormFieldInfo } from '@reapit/elements'

type FieldContactInformation = 'companyNameField' | 'nameField' | 'jobTitleField' | 'telephoneField'

export const formFieldsContactInfomation: Record<FieldContactInformation, FormFieldInfo> = {
  companyNameField: {
    name: 'companyName',
    label: 'Company Name',
    errorMessage: 'Company name is not valid',
  },
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
  telephoneField: {
    name: 'telephone',
    label: 'Telephone',
    errorMessage: 'Telephone is not valid',
  },
}
