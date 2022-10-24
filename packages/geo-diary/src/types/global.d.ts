import '@types/googlemaps'
import {
  AppointmentModel,
  OfficeModel,
  PropertyModel,
  NegotiatorModel,
  ListItemModel,
  KeysModel,
} from '@reapit/foundations-ts-definitions'

export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDsn: string
  connectClientId: string
  connectOAuthUrl: string
  connectUserPoolId: string
  graphqlUri: string
  googleMapApiKey: string
  platformApiUrl: string
  amlAppId: string
  amlAppUrl: string
  demoUser: string
  appId: string
}

declare global {
  interface Window {
    google: typeof google
    reapit: {
      config: Config
    }
  }
}

export type ExtendedAppointmentModel = AppointmentModel & {
  offices?: OfficeModel[]
  property?: PropertyModel & { keys?: KeysModel[] }
  negotiators?: NegotiatorModel[]
  appointmentType: ListItemModel
}
