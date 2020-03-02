import { validateRequire, validateEmail } from '@reapit/elements'
import { CustomCreateAppModel } from '@/components/pages/developer-submit-app'
import { isValidRedirectUrls, whiteListLocalhostAndIsValidUrl, isValidHttpUrl } from '@/utils/validate'

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

const MIN_DESCRIPTION_LENGTH = 150
const MAX_DESCRIPTION_LENGTH = 1000
const MIN_SUMMARY_LENGTH = 50
const MAX_SUMMARY_LENGTH = 150

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
  }

  if (values.redirectUris && !isValidRedirectUrls(values.redirectUris)) {
    errors.redirectUris = 'Invalid redirect uri(s)'
  }

  if (values.signoutUris && !isValidRedirectUrls(values.signoutUris)) {
    errors.signoutUris = 'Invalid sign out uri(s)'
  }

  if (values.homePage && !whiteListLocalhostAndIsValidUrl(values.homePage) && !isValidHttpUrl(values.homePage)) {
    errors.homePage = 'Invalid Home Page URL'
  }

  if (values.launchUri && !whiteListLocalhostAndIsValidUrl(values.launchUri)) {
    errors.launchUri = 'Invalid Launch URI'
  }

  const isValidDescription =
    values.description &&
    MIN_DESCRIPTION_LENGTH <= values.description?.length &&
    values.description?.length <= MAX_DESCRIPTION_LENGTH
  if (!isValidDescription) {
    errors.description = 'Must be between 150 and 1000 characters'
  }

  const isValidSummary =
    values?.summary && MIN_SUMMARY_LENGTH <= values?.summary?.length && values.summary?.length <= MAX_SUMMARY_LENGTH

  if (!isValidSummary) {
    errors.summary = 'Must be between 50 and 150 characters'
  }

  return errors
}
