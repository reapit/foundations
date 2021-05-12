export type ComingSoonApp = {
  image: string
  email: string
  integrationType: string
}

export type Config = {
  appEnv: 'local' | 'development' | 'production'
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
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
    __REDUX_DEVTOOLS_EXTENSION__?: Function
    Cypress: any
    store: any
  }
}
