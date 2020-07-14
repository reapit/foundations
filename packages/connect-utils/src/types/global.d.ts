export type Config = {
  cognitoOAuthUrl: string
  cognitoUserPoolId: string
  appEnv: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
    __REDUX_DEVTOOLS_EXTENSION__?: Function
  }
}
