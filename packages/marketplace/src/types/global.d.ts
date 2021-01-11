export type ComingSoonApp = {
  image: string
  email: string
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
  comingSoonApps: {
    agencyCloud: ComingSoonApp[]
    thirdParty: ComingSoonApp[]
    portals: ComingSoonApp[]
  }
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
