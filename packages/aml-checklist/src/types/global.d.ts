export type Config = {
  appEnv: 'local' | 'development' | 'production'
  appId: string
  sentryDns: string
  googleAnalyticsKey: string
  platformApiUrl: string
  connectClientId: string
  connectOAuthUrl: string
  connectUserPoolId: string
  marketplaceUrl: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
    __REDUX_DEVTOOLS_EXTENSION__?: Function
  }
}
