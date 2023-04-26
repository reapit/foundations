declare global {
  interface Window {}
}

export {}

declare global {
  interface Window {}

  namespace NodeJS {
    interface ProcessEnv {
      appEnv: 'local' | 'development' | 'production'
      appId?: string
      connectClientId: string
      connectOAuthUrl: string
      connectUserPoolId: string
      developerPortalUrl: string
      sentryDsn: string
    }
  }
}
