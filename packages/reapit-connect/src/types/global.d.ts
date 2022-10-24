export type Config = {
  appEnv: 'local' | 'development' | 'production'
  appId?: string
  connectClientId: string
  connectOAuthUrl: string
  connectUserPoolId: string
  developerPortalUrl: string
  sentryDsn: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
  }
}
