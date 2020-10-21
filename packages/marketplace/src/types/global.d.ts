export type ComingSoonApp = {
  image: string
  email: string
}

export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDns: string
  marketplaceApiUrl: string
  marketplaceApiKey: string
  swaggerUrl: string
  elementDocumentUrl: string
  cognitoClientId: string
  googleAnalyticsKey: string
  cognitoOAuthUrl: string
  cognitoUserPoolId: string
  chatbotAppId: string
  marketplaceUrl: string
  platformApiUrl: string
  webComponentConfigApiUrl: string
  developerEditionDownloadUrl: string
  urlSchemeUrl: string
  apiDocDesktop: string
  developerPortalUrl: string
  adminPortalUrl: string
  previewExternalAppIds: string[]
  previewFeaturedExternalAppIds: string[]
  connectLoginRedirectPath: string
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
