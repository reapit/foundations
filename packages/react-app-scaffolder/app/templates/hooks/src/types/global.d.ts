export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDns: string
  connectClientId: string
  connectUserPoolId: string
  googleAnalyticsKey: string
  connectOAuthUrl: string
  platformApiUrl: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
  }
}
