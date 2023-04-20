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
      opayoApiUrl: string
      platformApiUrl: string
      paymentsApiUrl: string
      marketplaceUrl: string
      appId: string
    }
  }
}
