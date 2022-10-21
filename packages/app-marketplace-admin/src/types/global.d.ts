export type AppEnv = 'local' | 'development' | 'production'

export type ComingSoonApp = {
  image: string
  email: string
  integrationType: string
}

export type Config = {
  appEnv: AppEnv
  sentryDsn: string
  connectClientId: string
  connectOAuthUrl: string
  connectUserPoolId: string
  platformApiUrl: string
  developerPortalUrl: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
  }
}
