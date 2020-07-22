export type Config = {
  appEnv: 'local' | 'development' | 'production'
  appId?: string
  cognitoClientId: string
  cognitoOAuthUrl: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
  }
}
