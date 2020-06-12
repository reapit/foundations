import * as Yup from 'yup'
import formFields from './form-fields'
import errorMessages from '@/constants/error-messages'

// eslint-disable-next-line
const validatePhoneRegex = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/g
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

const validationSchema = Yup.object().shape({
  [titleField.name]: Yup.string().required(errorMessages.FIELD_REQUIRED),
  [forenameField.name]: Yup.string().required(errorMessages.FIELD_REQUIRED),
  [surnameField.name]: Yup.string().required(errorMessages.FIELD_REQUIRED),
  [dateOfBirthField.name]: Yup.string().required(errorMessages.FIELD_REQUIRED),
  [emailField.name]: Yup.string()
    .required(errorMessages.FIELD_REQUIRED)
    .email(),
  [homePhoneField.name]: Yup.string()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(validatePhoneRegex, homePhoneField.errorMessage),
  [mobilePhoneField.name]: Yup.string()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(validatePhoneRegex, mobilePhoneField.errorMessage),
  [workPhoneField.name]: Yup.string()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(validatePhoneRegex, workPhoneField.errorMessage),
})

export default validationSchema
