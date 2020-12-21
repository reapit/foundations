export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDns: string
  googleAnalyticsKey: string
  connectClientId: string
  connectUserPoolId: string
  connectOAuthUrl: string
  platformApiUrl: string
  marketplaceUrl: string
  developersUrl: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
  }
}
