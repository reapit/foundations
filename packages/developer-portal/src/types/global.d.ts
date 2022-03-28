export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDns: string
  googleAnalyticsKey: string
  connectClientId: string
  connectOAuthUrl: string
  connectUserPoolId: string
  chatbotAppId: string
  marketplaceUrl: string
  platformApiUrl: string
  developerEditionDownloadUrl: string
  adobeSignApiKey: string
  liveChatWhitelist: string[]
  elementsUri: string
  graphQLUri: string
  analyticsSchemaDocsUrl: string
  swaggerUri: string
  PUSHER_KEY: string
  DEPLOYMENT_SERVICE_HOST: string
  pipelineWhitelist: string[]
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
    __REDUX_DEVTOOLS_EXTENSION__?: Function
    Cypress: any
    store: any
    GraphQLPlayground: {
      init: any
    }
  }
}
