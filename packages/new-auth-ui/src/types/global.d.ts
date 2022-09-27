export type Config = {
  appEnv: 'local' | 'development' | 'production'
  keycloakConnectClientId: string
  oryConnectClientId: string
  cognitoConnectClientId: string
  connectUserPoolId: string
  sentryDns: string
  googleAnalyticsKey: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
    Cypress: any
    store: any
    GraphQLPlayground: {
      init: any
    }
  }
}
