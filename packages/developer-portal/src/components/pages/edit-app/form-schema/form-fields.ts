import { FormFieldInfo } from '@reapit/utils'

type Field =
  | 'name'
  | 'categoryId'
  | 'telephone'
  | 'supportEmail'
  | 'launchUri'
  | 'iconImageUrl'
  | 'homePage'
  | 'description'
  | 'summary'
  | 'screen1ImageUrl'
  | 'screen2ImageUrl'
  | 'screen3ImageUrl'
  | 'screen4ImageUrl'
  | 'screen5ImageUrl'
  | 'authFlow'
  | 'redirectUris'
  | 'signoutUris'
  | 'scopes'
  | 'limitToClientIds'
  | 'desktopIntegrationTypeIds'
  | 'isDirectApi'
  | 'isListed'
  | 'isPrivateApp'
  | 'developerId'

export const formFields: Record<Field, FormFieldInfo> = {
  name: {
    name: 'name',
    label: 'Name',
    errorMessage: 'Should only contain letters and number',
    placeHolder: 'The name of your app as it will appear to users',
  },
  categoryId: {
    name: 'categoryId',
    label: 'Category',
  },
  supportEmail: {
    name: 'supportEmail',
    label: 'Support email',
    placeHolder: 'The contact to your support team if your users have a problem',
  },
  telephone: {
    name: 'telephone',
    label: 'Telephone',
    placeHolder: 'Should one of our developers need to contact you about your app',
    errorMessage: 'Invalid Telephone number',
  },
  homePage: {
    name: 'homePage',
    label: 'Home page',
    placeHolder: 'Your company homepage. HTTP:// or HTTPS://',
    errorMessage: 'Invalid Home Page URL',
  },
  launchUri: {
    name: 'launchUri',
    label: 'Launch URI',
    placeHolder: 'The launch page for your app. HTTPS only other than for http://localhost',
    errorMessage: 'Invalid Launch URI',
  },
  summary: {
    name: 'summary',
    label: 'Summary',
    placeHolder: 'A short strapline summary for your app listing. Must be between 50 and 150 characters',
  },
  description: {
    name: 'description',
    label: 'Description',
    placeHolder:
      // eslint-disable-next-line max-len
      'A detailed description for your app listing. Must be between 150 and 1500 characters. Please note: As this field supports HTML, special characters will be included in the character count',
  },
  authFlow: {
    name: 'authFlow',
    label: 'AUTHENTICATION FLOW',
  },
  redirectUris: {
    name: 'redirectUris',
    label: 'Redirect URI(s)',
    placeHolder: 'Enter your Redirect URI(s)',
    errorMessage: 'Invalid redirect uri(s)',
  },
  signoutUris: {
    name: 'signoutUris',
    label: 'Sign Out URI(s)',
    placeHolder: 'Enter your Sign Out URI(s)',
    errorMessage: 'Invalid sign out uri(s)',
  },
  iconImageUrl: {
    name: 'iconImageUrl',
    label: 'Upload Image',
  },
  screen1ImageUrl: {
    name: 'screen1ImageUrl',
    label: 'Upload Image',
  },
  screen2ImageUrl: {
    name: 'screen2ImageUrl',
    label: 'Upload Image',
  },
  screen3ImageUrl: {
    name: 'screen3ImageUrl',
    label: 'Upload Image',
  },
  screen4ImageUrl: {
    name: 'screen4ImageUrl',
    label: 'Upload Image',
  },
  screen5ImageUrl: {
    name: 'screen5ImageUrl',
    label: 'Upload Image',
  },
  scopes: {
    name: 'scopes',
    errorMessage: 'At least one Permission is required',
  },
  limitToClientIds: {
    name: 'limitToClientIds',
    placeHolder: 'Please enter the Customer ID. For multiple Customer ID’s, please separate using a comma',
    errorMessage: 'Invalid Customer ID(s). Each Customer ID should consist of 3 characters.',
  },
  desktopIntegrationTypeIds: {
    name: 'desktopIntegrationTypeIds',
    label: 'Integration Type',
    placeHolder: 'Please select',
  },
  isListed: {
    name: 'isListed',
    label: 'Is Listed Marketplace',
  },
  isDirectApi: {
    name: 'isDirectApi',
    label: 'Direct API',
  },
  isPrivateApp: {
    name: 'isPrivateApp',
    label: 'Private Apps',
  },
  developerId: {
    name: 'developerId',
    label: 'Developer ID',
  },
}

export default formFields
