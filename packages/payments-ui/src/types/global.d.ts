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
  platformApiUrl: string
  paymentApiUrl: string
  graphqlUri: string
  marketplaceUrl: string
  paymentsApiUrl: string
  emailApiUrl: string
  configServiceUrl: string
  opayo: { [key: string]: OpayoKeys }
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
