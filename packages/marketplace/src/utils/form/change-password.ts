import { ChangePasswordValues } from '@/components/pages/settings/change-password-form'
import { validateRequire, validatePassword } from '@reapit/elements'

export type ChangePasswordFormErrorKeys = keyof ChangePasswordValues

export const validate = (values: ChangePasswordValues) => {
  let errors = validateRequire<ChangePasswordValues, ChangePasswordFormErrorKeys>({
    values,
    currentErrors: {},
    keys: ['currentPassword', 'confirmPassword'] as ChangePasswordFormErrorKeys[]
  })

  errors = validatePassword({
    values,
    currentErrors: errors,
    keys: ['password']
  })

  if (values.password !== values.confirmPassword && !errors.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  return errors
}
