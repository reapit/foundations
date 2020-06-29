import ErrorMessages from '@/constants/error-messages'
import { FormValues } from '@/components/ui/developer-edition-modal/form-fields'

export type DeveloperEditionSubscriptionErrorKeys = {
  developerList?: string
}

export const validate = (values: FormValues) => {
  let errors: DeveloperEditionSubscriptionErrorKeys = {}

  if (!values.developerList || values.developerList.length == 0) {
    errors.developerList = ErrorMessages.FIELD_REQUIRED
  }

  return errors
}
