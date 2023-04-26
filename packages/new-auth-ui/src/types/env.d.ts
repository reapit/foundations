declare global {
  interface Window {}
}

export {}

declare global {
  interface Window {}

  namespace NodeJS {
    interface ProcessEnv {
      appEnv: 'local' | 'development' | 'production'
      keycloakConnectClientId: string
      oryConnectClientId: string
      cognitoConnectClientId: string
      connectUserPoolId: string
      sentryDsn: string
    }
  }
}
