export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDsn: string
  connectClientId: string
  connectOAuthUrl: string
  connectUserPoolId: string
  platformApiUrl: string
  developerPortalUri: string
  appMarketUri: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
    Cypress: any
    store: any
  }
}
