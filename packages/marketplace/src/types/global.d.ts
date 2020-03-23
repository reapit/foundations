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
  cognitoUserPoolId: string
  chatbotAppId: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
    __REDUX_DEVTOOLS_EXTENSION__?: Function
  }
}
