export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDsn: string
  connectClientId: string
  connectUserPoolId: string
  connectOAuthUrl: string
  platformApiUrl: string
  paymentsApiUrl: string
  marketplaceUrl: string
  appId: string
}

declare global {
  interface Window {
    sagepayOwnForm: ({ merchantSessionKey: string }) => {
      tokeniseCardDetails: (params: any) => void
    }
    SagePayConfig: {
      restHost?: string
    }
  }
}
