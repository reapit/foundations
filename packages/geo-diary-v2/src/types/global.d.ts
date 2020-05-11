export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDns: string
  cognitoClientId: string
  googleAnalyticsKey: string
  cognitoOAuthUrl: string
  cognitoUserPoolId: string
  graphqlUri: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
  }
}
