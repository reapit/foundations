import { ResetPasswordValues } from '@/components/pages/reset-password/reset-password-form'
import { validatePassword } from '@reapit/elements'

export type ResetPasswordFormErrorKeys = keyof ResetPasswordValues

export const validate = (values: ResetPasswordValues) => {
  let errors = validatePassword<ResetPasswordValues, ResetPasswordFormErrorKeys>({
    values,
    currentErrors: {},
    keys: ['password']
  })

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  return errors
}
