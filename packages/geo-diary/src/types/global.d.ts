export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDns: string
  platformApiUrl: string
  cognitoClientId: string
  googleAnalyticsKey: string
  googleMapApiKey: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
    __REDUX_DEVTOOLS_EXTENSION__?: Function
  }
}
