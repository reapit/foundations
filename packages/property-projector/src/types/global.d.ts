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
  rotationDuration: number
  refreshHour: number
  propertyLimit: number
  minPrice: number
  maxPrice: number
  randomize: boolean
  showAddress: boolean
  showStrapline: boolean
  sortBy: 'created' | 'price'
  departments: PropertyProjectorDepartments[]
  offices: PropertyProjectorOffices[]
}

type PropertyProjectorDepartments = {
  id: string
  name: string
  checked: boolean
  propertyTypes: any[]
}

type PropertyProjectorOffices = {
  id: string
  name: string
  checked: boolean
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
  }
}
