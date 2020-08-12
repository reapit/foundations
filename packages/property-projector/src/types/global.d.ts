export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDns: string
  connectClientId: string
  googleAnalyticsKey: string
  connectOAuthUrl: string
  platformApiUrl: string
}

export type PropertyProjectorConfig = {
  logo: string
  primaryColour: string
  secondaryColour: string
  interval: number
  propertyLimit: number
  minPrice: number
  maxPrice: number
  randomize: boolean
  showAddress: boolean
  sortBy: 'created' | 'price'
  departments: PropertyProjectorDepartments[]
  offices: PropertyProjectorOffices[]
}

type PropertyProjectorDepartments = {
  id: string
  name: string
  propertyTypes: string[]
}

type PropertyProjectorOffices = {
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
