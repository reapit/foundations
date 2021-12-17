import { ServerContext } from '../../utils'
import {
  GetAppointmentByIdArgs,
  CreateAppointmentArgs,
  UpdateAppointmentArgs,
  GetAppointmentsArgs,
  GetAppointmentByIdReturn,
  GetAppointmentsReturn,
  CreateAppointmentReturn,
  UpdateAppointmentReturn,
} from './appointments'
import {
  callGetAppointmentByIdAPI,
  callGetAppointmentsAPI,
  callCreateAppointmentAPI,
  callUpdateAppointmentAPI,
} from './api'

export const getAppointmentById = (args: GetAppointmentByIdArgs, context: ServerContext): GetAppointmentByIdReturn => {
  const appointment = callGetAppointmentByIdAPI(args, context)
  return appointment
}

export const getAppointments = (args: GetAppointmentsArgs, context: ServerContext): GetAppointmentsReturn => {
  const appointments = callGetAppointmentsAPI(args, context)
  return appointments
}

export const createAppointment = (args: CreateAppointmentArgs, context: ServerContext): CreateAppointmentReturn => {
  const createResult = callCreateAppointmentAPI(args, context)
  return createResult
}

export const updateAppointment = (args: UpdateAppointmentArgs, context: ServerContext): UpdateAppointmentReturn => {
  const updateResult = callUpdateAppointmentAPI({ ...args }, context)
  return updateResult
}

const appointmentServices = {
  getAppointmentById,
  getAppointments,
  createAppointment,
  updateAppointment,
}

export default appointmentServices
