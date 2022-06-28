export type AppEnv = 'local' | 'development' | 'production'

export type ComingSoonApp = {
  image: string
  email: string
  integrationType: string
}

export type Config = {
  appEnv: AppEnv
  sentryDns: string
  googleAnalyticsKey: string
  connectClientId: string
  connectOAuthUrl: string
  connectUserPoolId: string
  platformApiUrl: string
  webComponentConfigApiUrl: string
  developerPortalUrl: string
  orgAdminRestrictedAppIds: string[]
  adminRestrictedAppIds: string[]
  reapitConnectManagementUri: string
  comingSoonApps: ComingSoonApp[]
  clientHiddenAppIds: {
    [key: string]: string[]
  }
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
  }
}
