import * as Yup from 'yup'
import formFields from './form-fields'
import errorMessages from '@/constants/error-messages'

const { FIELD_REQUIRED } = errorMessages

const {
  titleField,
  forenameField,
  surnameField,
  homePhoneField,
  mobilePhoneField,
  workPhoneField,
  emailField,
} = formFields

const profileValidationSchema = Yup.object().shape({
  [titleField.name]: Yup.string().trim().required(FIELD_REQUIRED),
  [forenameField.name]: Yup.string().trim().required(FIELD_REQUIRED),
  [surnameField.name]: Yup.string().trim().required(FIELD_REQUIRED),
  [emailField.name]: Yup.string().trim().required(FIELD_REQUIRED).email(emailField.errorMessage),
  [homePhoneField.name]: Yup.string()
    .nullable()
    .when([mobilePhoneField.name, workPhoneField.name], {
      is: (mobilePhone, workPhone) => !mobilePhone && !workPhone,
      then: Yup.string().required(FIELD_REQUIRED),
    }),
})

export default profileValidationSchema
