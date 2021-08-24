export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDns: string
  connectClientId: string
  connectUserPoolId: string
  googleAnalyticsKey: string
  connectOAuthUrl: string
  platformApiUrl: string
  graphqlUri: string
  marketplaceUrl: string
  API_KEY_SERVICE_HOST: string
  DEPLOYMENT_SERVICE_HOST: string
  PUSHER_KEY: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
  }
}
