import Routes from '@/constants/routes'
import ActionTypes from '@/constants/action-types'
import { OnlineState } from '@/reducers/online'
import { ErrorState } from '@/reducers/error'
import { HomeState } from '@/reducers/home'
import { AppointmentsState } from '@/reducers/appointments'
import { AppointmentDetailState } from '@/reducers/appointment-detail'
import { AuthState } from '@/reducers/auth'
import { NextAppointmentState } from '@/reducers/next-appointment'
import { DirectionState } from '@/reducers/direction'
import {
  PagedResultAppointmentModel_,
  AppointmentModel,
  OfficeModel,
  PropertyModel,
  NegotiatorModel
} from '@reapit/foundations-ts-definitions'

export type ExtendedPagedResultAppointmentModel_ = Omit<PagedResultAppointmentModel_, '_embedded'> & {
  _embedded?: ExtendedAppointmentModel[]
}

export type ExtendedAppointmentModel = AppointmentModel & {
  offices?: OfficeModel[]
  property?: PropertyModel
  negotiators?: NegotiatorModel[]
}

export interface Action<T> {
  readonly type: ActionType
  readonly data: T
}

export interface ActionCreator<T> {
  readonly type: string
  (data: T): Action<T>
}

export interface StringMap {
  [key: string]: string
}

export type PartialRecord<K extends keyof any, T> = { [P in K]?: T }

export type RouteValue = keyof typeof Routes

export type ActionType = keyof typeof ActionTypes

export type FormState = 'PENDING' | 'DONE' | 'SUBMITTING' | 'ERROR' | 'SUCCESS'

export interface FetcherParams<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  api: string
  url: string
  headers: StringMap
  isPrivate?: boolean
  body?: T
}

export interface ReduxState {
  online: OnlineState
  error: ErrorState
  home: HomeState
  direction: DirectionState
  appointments: AppointmentsState
  appointmentDetail: AppointmentDetailState
  auth: AuthState
  nextAppointment: NextAppointmentState
}
