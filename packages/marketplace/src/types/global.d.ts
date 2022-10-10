export type AppEnv = 'local' | 'development' | 'production'

export type Config = {
  appEnv: AppEnv
  sentryDsn: string
  mixPanelToken: string
  connectClientId: string
  connectOAuthUrl: string
  connectUserPoolId: string
  developerPortalUrl: string
  orgAdminRestrictedAppIds: string[]
  reapitConnectManagementUri: string
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
