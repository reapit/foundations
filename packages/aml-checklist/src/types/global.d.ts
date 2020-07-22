export type Config = {
  appEnv: 'local' | 'development' | 'production'
  appId?: string
  sentryDns: string
  platformApiUrl: string
  uploadApiUrl: string
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
