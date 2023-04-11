export type Config = {
  appEnv: 'local' | 'development' | 'production'
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
  }
}
