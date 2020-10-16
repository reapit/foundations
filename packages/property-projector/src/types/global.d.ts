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
  headerTextColour: string
  interval: number
  propertyLimit: number
  marketingMode: string[]
  sellingStatuses: string[]
  lettingStatuses: string[]
  minPrice: number
  maxPrice: number
  minRent: number
  maxRent: number
  showAddress: boolean
  sortBy: 'created' | 'price'
  departments: object
  offices: string[]
}

export type Department = {
  id: string
  name: string
  propertyTypes: string[]
}

export type Office = {
  id: string
  name: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
  }
}
