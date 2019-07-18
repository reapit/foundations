import { SubmitAppFormValues } from '@/components/pages/developer-submit-app'
import { validateRequire, validateEmail } from '../validators'

export type SubmitAppFormErrorKeys =
  | 'name'
  | 'telephone'
  | 'supportEmail'
  | 'launchUri'
  | 'iconImageData'
  | 'homePage'
  | 'description'
  | 'summary'
  | 'screen1ImageData'

export const validate = (values: SubmitAppFormValues) => {
  let errors = validateRequire<SubmitAppFormValues, SubmitAppFormErrorKeys>({
    values,
    currentErrors: {},
    keys: [
      'name',
      'telephone',
      'supportEmail',
      'launchUri',
      'iconImageData',
      'homePage',
      'description',
      'summary',
      'screen1ImageData'
    ]
  })

  errors = validateEmail({
    values,
    currentErrors: errors,
    keys: ['supportEmail']
  })

  return errors
}
