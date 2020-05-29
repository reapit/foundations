export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDns: string
  cognitoClientId: string
  googleAnalyticsKey: string
  cognitoOAuthUrl: string
  cognitoUserPoolId: string
  searchWidgetApiKey: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
    ReapitSearchWidget: any
    ReapitPropertyDetailWidget: any
    ReapitBookValuationWidget: any
  }
}
