export type OpayoKeys = {
  integrationKey: string
  passKey: string
  vendorName: string
}

export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDns: string
  connectClientId: string
  connectUserPoolId: string
  googleAnalyticsKey: string
  connectOAuthUrl: string
  platformApiUrl: string
  paymentApiUrl: string
  graphqlUri: string
  marketplaceUrl: string
  paymentsApiUrl: string
  emailApiUrl: string
  opayo: { [key: string]: OpayoKeys }
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
    sagepayOwnForm: ({
      merchantSessionKey: string,
    }) => {
      tokeniseCardDetails: (params: any) => void
    }
  }
}
