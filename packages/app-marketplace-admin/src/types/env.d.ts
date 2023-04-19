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
      platformApiUrl: string
      developerPortalUrl: string
      marketplaceUrl: string
    }
  }
}
