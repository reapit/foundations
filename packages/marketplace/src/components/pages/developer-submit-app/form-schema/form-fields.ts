import { FormFieldInfo } from '@reapit/elements'

type Field =
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
  | 'limitToClientIds'

const formFields: Record<Field, FormFieldInfo> = {
  name: {
    name: 'name',
    label: 'NAME',
    errorMessage: 'Name only contain letters and numbers',
  },
  supportEmail: {
    name: 'supportEmail',
    label: 'SUPPORT EMAIL',
  },
  telephone: {
    name: 'telephone',
    label: 'TELEPHONE',
  },
  homePage: {
    name: 'homePage',
    label: 'HOME PAGE',
  },
  launchUri: {
    name: 'launchUri',
    label: 'LAUNCH URI',
  },
  summary: {
    name: 'summary',
    label: 'SUMMARY',
  },
  description: {
    name: 'description',
    label: 'DESCRIPTION',
  },
  authFlow: {
    name: 'authFlow',
    label: 'AUTHENTICATION FLOW',
  },
  redirectUris: {
    name: 'redirectUris',
    label: 'REDIRECT URI(S)',
  },
  signoutUris: {
    name: 'signoutUris',
    label: 'SIGN OUT URI(S)',
  },
  iconImageUrl: {
    name: 'iconImageUrl',
    label: 'ICON',
  },
  screen1ImageUrl: {
    name: 'screen1ImageUrl',
    label: 'SCREENSHOT 1',
  },
  scopes: {
    name: 'scopes',
    label: 'PERMISSIONS',
  },
  limitToClientIds: {
    name: 'limitToClientIds',
    label: 'limitToClientIds',
  },
}

export default formFields
