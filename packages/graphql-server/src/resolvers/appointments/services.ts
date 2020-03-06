import logger from '../../logger'
import { ServerContext } from '../../app'
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
  const traceId = context.traceId
  logger.info('getAppointmentById', { traceId, args })
  const appointment = callGetAppointmentByIdAPI(args, context)
  return appointment
}

export const getAppointments = async (args: GetAppointmentsArgs, context: ServerContext): GetAppointmentsReturn => {
  const traceId = context.traceId
  logger.info('getAppointments', { traceId, args })
  const appointments = await callGetAppointmentsAPI(args, context)
  return appointments
}

export const createAppointment = (args: CreateAppointmentArgs, context: ServerContext): CreateAppointmentReturn => {
  const traceId = context.traceId
  logger.info('createAppointment', { traceId, args })
  const createResult = callCreateAppointmentAPI(args, context)
  return createResult
}

export const updateAppointment = (args: UpdateAppointmentArgs, context: ServerContext): UpdateAppointmentReturn => {
  const traceId = context.traceId
  logger.info('updateAppointment', { traceId, args })
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
