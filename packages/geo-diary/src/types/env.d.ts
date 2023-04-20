declare global {
  interface Window {}
}

export {}

declare global {
  interface Window {}

  namespace NodeJS {
    interface ProcessEnv {
      appEnv: 'local' | 'development' | 'production'
      sentryDsn: string
      connectClientId: string
      connectOAuthUrl: string
      connectUserPoolId: string
      graphqlUri: string
      googleMapApiKey: string
      platformApiUrl: string
      amlAppId: string
      amlAppUrl: string
      demoUser: string
      appId: string
    }
  }
}
