import * as Yup from 'yup'
import formFields from './form-fields'
import errorMessages from '@/constants/error-messages'
import { telephoneRegex } from '@reapit/elements'

// eslint-disable-next-line
const {
  titleField,
  forenameField,
  surnameField,
  dateOfBirthField,
  homePhoneField,
  mobilePhoneField,
  workPhoneField,
  emailField,
} = formFields

const profileValidationSchema = Yup.object().shape({
  [titleField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED),
  [forenameField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED),
  [surnameField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED),
  [dateOfBirthField.name]: Yup.string().required(errorMessages.FIELD_REQUIRED),
  [emailField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .email(emailField.errorMessage),
  [homePhoneField.name]: Yup.string()
    .nullable()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(telephoneRegex, homePhoneField.errorMessage),
  [mobilePhoneField.name]: Yup.string()
    .nullable()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(telephoneRegex, mobilePhoneField.errorMessage),
  [workPhoneField.name]: Yup.string()
    .nullable()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(telephoneRegex, workPhoneField.errorMessage),
})

export default profileValidationSchema
