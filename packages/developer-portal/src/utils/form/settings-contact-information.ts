import { ContactInformationValues } from '@/components/pages/settings/forms/contact-information-form'
import ErrorMessages from '@/constants/error-messages'
import { isValidPersonName, isValidTelephone } from '@/utils/validate'

export type SettingsContactInformationErrorKeys = Partial<ContactInformationValues>

export const validate = (values: ContactInformationValues) => {
  let errors: SettingsContactInformationErrorKeys = {}

  if (values.telephone && !isValidTelephone(values.telephone)) {
    errors.telephone = ErrorMessages.FIELD_PHONE_NUMER
  }

  if (values.name && !isValidPersonName(values.name)) {
    errors.name = ErrorMessages.FIELD_INVALID_NAME
  }

  return errors
}
