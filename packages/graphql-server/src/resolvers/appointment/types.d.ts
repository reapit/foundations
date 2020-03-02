import { AuthenticationError, UserInputError } from 'apollo-server'
import {
  PagedResultAppointmentModel_,
  AppointmentModel,
  CreateAppointmentModel,
  UpdateAppointmentModel,
} from '../../types'

// args
export type GetAppointmentsArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  typeId?: string[]
  negotiatorId?: string[]
  officeId?: string[]
  propertyId?: string[]
  start: string
  end: string
  includeCancelled?: boolean
  includeUnconfirmed?: boolean
}

export type GetAppointmentByIdArgs = {
  id: string
}

export type CreateAppointmentArgs = CreateAppointmentModel
export type UpdateAppointmentArgs = { id: string; _eTag?: string } & UpdateAppointmentModel

// api, service return types
export type GetAppointmentByIdReturn = Promise<AppointmentModel | UserInputError>
export type GetAppointmentsReturn = Promise<PagedResultAppointmentModel_ | UserInputError>
/* temporary return boolean, will change later */
export type CreateAppointmentReturn = Promise<boolean | UserInputError>
export type UpdateAppointmentReturn = Promise<boolean | UserInputError>

// resolver return types
export type QueryAppointmentReturn = AuthenticationError | GetAppointmentByIdReturn
export type QueryAppointmentsReturn = AuthenticationError | GetAppointmentsReturn
export type MutationCreateAppointmentReturn = AuthenticationError | CreateAppointmentReturn
export type MutationUpdateAppointmentReturn = AuthenticationError | UpdateAppointmentReturn
