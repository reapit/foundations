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
      connectUserPoolId: string
      connectOAuthUrl: string
      platformApiUrl: string
      graphqlUri: string
      marketplaceUrl: string
    }
  }
}
