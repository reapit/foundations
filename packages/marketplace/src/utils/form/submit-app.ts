import { validateRequire, validateEmail } from '@reapit/elements'
import { CustomCreateAppModel } from '@/components/pages/developer-submit-app'
import { isValidRedirectUrls } from '@/utils/validate'

export type SubmitAppFormErrorKeys =
  | 'name'
  | 'telephone'
  | 'supportEmail'
  | 'launchUri'
  | 'iconImageUrl'
  | 'homePage'
  | 'description'
  | 'summary'
  | 'screen1ImageUrl'
  | 'authFlow'
  | 'redirectUris'

export const validate = (values: CustomCreateAppModel) => {
  let errors = validateRequire<CustomCreateAppModel, SubmitAppFormErrorKeys>({
    values,
    currentErrors: {},
    keys: [
      'name',
      'telephone',
      'supportEmail',
      'launchUri',
      'iconImageUrl',
      'homePage',
      'description',
      'summary',
      'screen1ImageUrl',
      'authFlow',
      'redirectUris',
    ],
  })

  errors = validateEmail({
    values,
    currentErrors: errors,
    keys: ['supportEmail'],
  })

  if (values.redirectUris && !isValidRedirectUrls(values.redirectUris)) {
    errors.redirectUris = 'Invalid redirect uri(s)'
  }

  return errors
}
