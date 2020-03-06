import { AuthenticationError, UserInputError } from 'apollo-server'
import {
  AppointmentModel,
  PagedResultAppointmentModel_,
  CreateAppointmentModel,
  UpdateAppointmentModel,
} from '../../types'

export type CreateAppointmentArgs = CreateAppointmentModel

export type UpdateAppointmentArgs = { id: string; _eTag: string } & UpdateAppointmentModel

export type GetAppointmentByIdArgs = {
  id: string
}

export type GetAppointmentsArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  typeId?: string[]
  negotiatorId?: string[]
  officeId?: string[]
  propertyId?: string[]
  start?: string
  end?: string
  includeCancelled?: boolean
  includeUnconfirmed?: boolean
}

// api return type
export type GetAppointmentByIdReturn = Promise<AppointmentModel | UserInputError>
export type GetAppointmentsReturn = Promise<PagedResultAppointmentModel_ | UserInputError>

// temporarily return boolean, will change later
export type CreateAppointmentReturn = Promise<boolean | UserInputError>
export type UpdateAppointmentReturn = Promise<boolean | UserInputError>

// resolver type
export type QueryGetAppointmentByIdReturn = AuthenticationError | GetAppointmentByIdReturn
export type QueryGetAppointmentsReturn = AuthenticationError | GetAppointmentsReturn
export type MutationCreateAppointmentReturn = AuthenticationError | CreateAppointmentReturn
export type MutationUpdateAppointmentReturn = AuthenticationError | UpdateAppointmentReturn
