import { FormFieldInfo } from '@reapit/elements'

type Field =
  | 'titleField'
  | 'forenameField'
  | 'surnameField'
  | 'dateOfBirthField'
  | 'homePhoneField'
  | 'mobilePhoneField'
  | 'workPhoneField'
  | 'emailField'

const formFields: Record<Field, FormFieldInfo> = {
  titleField: {
    name: 'title',
    label: 'Title',
  },
  forenameField: {
    name: 'forename',
    label: 'Forename',
  },
  surnameField: {
    name: 'surname',
    label: 'Surname',
  },
  dateOfBirthField: {
    name: 'dateOfBirth',
    label: 'Date Of Birth',
  },
  homePhoneField: {
    name: 'homePhone',
    label: 'Home',
    errorMessage: 'Invalid home phone format',
  },
  mobilePhoneField: {
    name: 'mobilePhone',
    label: 'Mobile',
    errorMessage: 'Invalid mobile phone format',
  },
  workPhoneField: {
    name: 'workPhone',
    label: 'Work',
    errorMessage: 'Invalid work phone format',
  },
  emailField: {
    name: 'email',
    label: 'Email',
    errorMessage: 'Invalid email format',
  },
}

export default formFields
