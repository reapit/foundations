export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDns: string
  marketplaceApiUrl: string
  marketplaceApiKey: string
  uploadApiUrl: string
  swaggerUrl: string
  elementDocumentUrl: string
  cognitoClientId: string
  googleAnalyticsKey: string
  cognitoOAuthUrl: string
  chatbotAppId: string
  marketplaceUrl: string
  platformApiUrl: string
  webComponentConfigApiUrl: string
  developerEditionDownloadUrl: string
  urlSchemeUrl: string
  apiDocDesktop: string
  cognitoUserPoolId: string
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
