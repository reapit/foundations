import { KeycloakProvider, OryProvider, ReapitConnectBrowserSession } from '@reapit/connect-session-next'

const defaultValues = {
  connectLoginRedirectPath: '',
  connectUserPoolId: process.env.connectUserPoolId,
  connectApplicationTimeout: 86400000, // 24hrs in ms
}

const ory = {
  ...defaultValues,
  connectClientId: process.env.oryConnectClientId,
  connectOAuthUrl: 'https://reapit-connect-api.dev.paas.reapit.cloud',
}

const cognito = {
  ...defaultValues,
  connectClientId: process.env.cognitoConnectClientId,
  connectOAuthUrl: 'https://connect.dev.paas.reapit.cloud',
}

const keycloak = {
  ...defaultValues,
  connectClientId: process.env.keycloakConnectClientId,
  connectOAuthUrl: 'https://keycloak.dev.paas.reapit.cloud',
}

// Needs to be a singleton as the class is stateful
export const reapitConnectCognito = new ReapitConnectBrowserSession({
  ...cognito,
})

export const reapitConnectKeycloak = new ReapitConnectBrowserSession({
  ...keycloak,
  authProvider: new KeycloakProvider({
    ...keycloak,
    baseUrl: keycloak.connectOAuthUrl,
  }),
})

export const reapitConnectOry = new ReapitConnectBrowserSession({
  ...ory,
  authProvider: new OryProvider({
    ...ory,
    baseUrl: ory.connectOAuthUrl,
  }),
})

const loginType = localStorage.getItem('__LOGIN_TYPE__')

export const reapitConnectBrowserSession =
  loginType === 'keycloak' ? reapitConnectKeycloak : loginType === 'ory' ? reapitConnectOry : reapitConnectCognito
