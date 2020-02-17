import { validateRequire, validateEmail } from '@reapit/elements'
import { CustomCreateAppModel } from '@/components/pages/developer-submit-app'
import { isValidRedirectUrls, whiteListLocalhostAndIsValidUrl } from '@/utils/validate'

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
  | 'scopes'

export const validate = (values: CustomCreateAppModel) => {
  const keysRequiredBase: SubmitAppFormErrorKeys[] = [
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
  const keysRequiredClientCredentials: SubmitAppFormErrorKeys[] = [...keysRequiredBase, 'scopes']
  const keysRequiredAuthorizationCode: SubmitAppFormErrorKeys[] = [...keysRequiredBase, 'redirectUris', 'signoutUris']
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
    const { scopes: scopesValues } = values
    if (Array.isArray(scopesValues) && scopesValues.length === 0) {
      errors.scopes = 'At least one Permission is required'
    }
    return errors
  }

  if (values.redirectUris && !isValidRedirectUrls(values.redirectUris)) {
    errors.redirectUris = 'Invalid redirect uri(s)'
  }

  if (values.signoutUris && !isValidRedirectUrls(values.signoutUris)) {
    errors.signoutUris = 'Invalid sign out uri(s)'
  }

  if (values.homePage && !whiteListLocalhostAndIsValidUrl(values.homePage)) {
    errors.homePage = 'Invalid Home Page URL'
  }

  if (values.launchUri && !whiteListLocalhostAndIsValidUrl(values.launchUri)) {
    errors.launchUri = 'Invalid Launch URI'
  }

  return errors
}
