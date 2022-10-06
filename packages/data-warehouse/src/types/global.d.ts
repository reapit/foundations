export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDsn: string
  connectClientId: string
  connectUserPoolId: string
  connectOAuthUrl: string
  platformApiUrl: string
  marketplaceUrl: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
  }
}
