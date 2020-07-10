export type AppEnv = 'local' | 'development' | 'production'

export type Config = {
  appEnv: AppEnv
  cognitoClientId: string
  cognitoOAuthUrl: string
  cognitoUserPoolId: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
  }
}
