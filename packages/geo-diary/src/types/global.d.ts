import '@types/googlemaps'
import {
  AppointmentModel,
  OfficeModel,
  PropertyModel,
  NegotiatorModel,
  ListItemModel,
  KeysModel,
} from '@reapit/foundations-ts-definitions'

declare global {
  interface Window {
    google: typeof google
  }
}

export type ExtendedAppointmentModel = AppointmentModel & {
  offices?: OfficeModel[]
  property?: PropertyModel & { keys?: KeysModel[] }
  negotiators?: NegotiatorModel[]
  appointmentType: ListItemModel
}
