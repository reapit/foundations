/* istanbul ignore file */
import { passwordRegex } from '@reapit/utils-common'
import errorMessages from '../../../../constants/error-messages'
import { object, ref, string } from 'yup'

const { FIELD_REQUIRED } = errorMessages

export const validationSchemaChangePassword = object().shape({
  password: string().trim().required(FIELD_REQUIRED),
  newPassword: string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(
      passwordRegex,
      'Your Password should be a minimum of 8 characters; must contain at least one lowercase letter, one uppercase letter and one number.',
    ),
  confirmPassword: string()
    .trim()
    .required(FIELD_REQUIRED)
    .oneOf([ref('password'), ''], 'Passwords do not match.'),
})
