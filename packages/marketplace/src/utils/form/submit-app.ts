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
  | 'signoutUris'

export const validate = (values: CustomCreateAppModel) => {
  const keysRequiredClientCredentials: SubmitAppFormErrorKeys[] = [
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
  ]
  const keysRequiredAuthorizationCode: SubmitAppFormErrorKeys[] = [
    ...keysRequiredClientCredentials,
    'redirectUris',
    'signoutUris',
  ]
  let errors = validateRequire<CustomCreateAppModel, SubmitAppFormErrorKeys>({
    values,
    currentErrors: {},
    keys: values.authFlow === 'clientCredentials' ? keysRequiredClientCredentials : keysRequiredAuthorizationCode,
  })

  errors = validateEmail({
    values,
    currentErrors: errors,
    keys: ['supportEmail'],
  })

  // only validating redirectUris and signoutUris when authFlow === 'authorisationCode

  if (values.authFlow === 'clientCredentials') {
    return errors
  }

  if (values.redirectUris && !isValidRedirectUrls(values.redirectUris)) {
    errors.redirectUris = 'Invalid redirect uri(s)'
  }

  if (values.signoutUris && !isValidRedirectUrls(values.signoutUris)) {
    errors.signoutUris = 'Invalid sign out uri(s)'
  }

  return errors
}
