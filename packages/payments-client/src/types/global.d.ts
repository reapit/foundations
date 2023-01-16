export type OpayoKeys = {
  integrationKey: string
  passKey: string
  vendorName: string
}

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
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
    sagepayOwnForm: ({ merchantSessionKey: string }) => {
      tokeniseCardDetails: (params: any) => void
    }
  }
}
