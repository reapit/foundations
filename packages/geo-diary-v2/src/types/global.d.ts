import {
  AppointmentModel,
  OfficeModel,
  PropertyModel,
  NegotiatorModel,
  ListItemModel,
} from '@reapit/foundations-ts-definitions'

export type Config = {
  appEnv: 'local' | 'development' | 'production'
  sentryDns: string
  cognitoClientId: string
  googleAnalyticsKey: string
  cognitoOAuthUrl: string
  cognitoUserPoolId: string
  graphqlUri: string
  googleMapApiKey: string
}

declare global {
  interface Window {
    reapit: {
      config: Config
    }
  }
}

export type ExtendedAppointmentModel = AppointmentModel & {
  offices?: OfficeModel[]
  property?: PropertyModel
  negotiators?: NegotiatorModel[]
  appointmentType: ListItemModel
}
