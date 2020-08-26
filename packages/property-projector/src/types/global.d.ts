export type Config = {
  appEnv: 'local' | 'development' | 'production'
  dynamoEnv: string
  sentryDns: string
  connectClientId: string
  googleAnalyticsKey: string
  connectOAuthUrl: string
  platformApiUrl: string
  cognitoUserPoolId: string
}

export type PropertyProjectorConfig = {
  logo: string
  primaryColour: string
  secondaryColour: string
  interval: number
  propertyLimit: number
  minPrice: number
  maxPrice: number
  showAddress: boolean
  sortBy: 'created' | 'price'
  departments: any[]
  offices: string[]
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
  }
}
