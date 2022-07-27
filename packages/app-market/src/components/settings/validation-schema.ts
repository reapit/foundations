/* istanbul ignore file */
import { passwordRegex } from '@reapit/utils-common'
import { object, ref, string } from 'yup'

export const validationSchemaChangePassword = object().shape({
  password: string().trim().required(),
  newPassword: string()
    .trim()
    .required()
    .matches(
      passwordRegex,
      'Your Password should be a minimum of 8 characters; must contain at least one lowercase letter, one uppercase letter and one number.',
    ),
  confirmPassword: string()
    .trim()
    .required()
    .oneOf([ref('newPassword'), ''], 'Passwords do not match.'),
})
