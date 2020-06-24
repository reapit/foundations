import { FormFieldInfo } from '@reapit/elements'

export type Field = 'nameField' | 'redirectUrisField' | 'signoutUrisField' | 'authFlowField' | 'scopesField'

export const formFields: Record<Field, FormFieldInfo> = {
  nameField: {
    name: 'name',
    placeHolder: 'Please enter an app name',
  },
  redirectUrisField: {
    name: 'redirectUris',
    label: 'Redirect URI(s)',
    placeHolder: 'Please enter your Redirect URI(s)',
  },
  signoutUrisField: {
    name: 'signoutUris',
    label: 'Sign Out URI(s)',
    placeHolder: 'Please enter your Sign Out URI(s)',
  },
  authFlowField: {
    name: 'authFlow',
  },
  scopesField: {
    name: 'scopes',
  },
}
