export type AppEnv = 'local' | 'development' | 'production'

export type Config = {
  appEnv: AppEnv | string
  connectClientId: string
  connectOAuthUrl: string
  connectUserPoolId: string
  platformApiUrl: string
  marketplaceUrl: string
  googleAnalyticsKey: string
  sentryDns: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
  }
}
