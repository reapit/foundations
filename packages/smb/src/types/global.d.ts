export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDns: string
  graphqlUri: string
  cognitoClientId: string
  googleAnalyticsKey: string
  cognitoOAuthUrl: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
    __REDUX_DEVTOOLS_EXTENSION__?: Function
  }
}
