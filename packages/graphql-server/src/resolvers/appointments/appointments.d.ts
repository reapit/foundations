import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import {
  AppointmentModel,
  AppointmentModelPagedResult,
  CreateAppointmentModel,
  UpdateAppointmentModel,
} from '@reapit/foundations-ts-definitions'

export type CreateAppointmentArgs = CreateAppointmentModel

export type UpdateAppointmentArgs = { id: string; _eTag: string } & UpdateAppointmentModel

export type GetAppointmentByIdArgs = {
  id: string
  embed?: ('negotiators' | 'offices' | 'organiser' | 'property' | 'type')[]
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
  embed?: ('negotiators' | 'offices' | 'organiser' | 'property' | 'type')[]
}

// api return type
export type GetAppointmentByIdReturn = Promise<AppointmentModel | UserInputError>
export type GetAppointmentsReturn = Promise<AppointmentModelPagedResult | UserInputError>
export type CreateAppointmentReturn = Promise<AppointmentModel | UserInputError>
export type UpdateAppointmentReturn = Promise<AppointmentModel | UserInputError>

// resolver type
export type QueryGetAppointmentByIdReturn = AuthenticationError | GetAppointmentByIdReturn
export type QueryGetAppointmentsReturn = AuthenticationError | GetAppointmentsReturn
export type MutationCreateAppointmentReturn = AuthenticationError | CreateAppointmentReturn
export type MutationUpdateAppointmentReturn = AuthenticationError | UpdateAppointmentReturn
