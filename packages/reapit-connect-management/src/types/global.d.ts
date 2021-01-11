export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDns: string
  connectClientId: string
  connectUserPoolId: string
  googleAnalyticsKey: string
  connectOAuthUrl: string
  platformApiUrl: string
  marketplaceUrl: string
  groupIdsWhitelist: string[]
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
  }
}
