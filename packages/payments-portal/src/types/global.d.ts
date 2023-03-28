export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDsn: string
  connectClientId: string
  connectUserPoolId: string
  connectOAuthUrl: string
  opayoApiUrl: string
  platformApiUrl: string
  paymentsApiUrl: string
  marketplaceUrl: string
  apiKey: string
  appId: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
    sagepayOwnForm: ({ merchantSessionKey: string }) => {
      tokeniseCardDetails: (params: any) => void
    }
    SagePayConfig: {
      restHost?: string
    }
  }
}
