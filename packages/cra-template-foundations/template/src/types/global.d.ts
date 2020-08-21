export type AppEnv = 'local' | 'development' | 'production'

export type Config = {
  appEnv: AppEnv
  connectClientId: string
  connectOAuthUrl: string
  connectUserPoolId: string
  platformApiUrl: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
  }
}
