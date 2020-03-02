import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  callUpdateAppointmentByIdAPI,
  callGetAppointmentByIdAPI,
  callGetAppointmentsAPI,
  callCreateAppointmentByAPI,
} from './api'

import {
  UpdateAppointmentReturn,
  GetAppointmentsReturn,
  GetAppointmentByIdReturn,
  CreateAppointmentReturn,
  GetAppointmentsArgs,
  GetAppointmentByIdArgs,
  UpdateAppointmentArgs,
  CreateAppointmentArgs,
} from './types'

export const updateAppointmentById = (args: UpdateAppointmentArgs, context: ServerContext): UpdateAppointmentReturn => {
  const traceId = context.traceId
  logger.info('updateAppointmentByAPI', { traceId, args })
  const appointment = callUpdateAppointmentByIdAPI(args, context)
  return appointment
}

export const getAppointments = (args: GetAppointmentsArgs, context: ServerContext): GetAppointmentsReturn => {
  const traceId = context.traceId
  logger.info('getAppointments', { traceId, args })
  const appointment = callGetAppointmentsAPI(args, context)
  return appointment
}

export const getAppointmentById = (args: GetAppointmentByIdArgs, context: ServerContext): GetAppointmentByIdReturn => {
  const traceId = context.traceId
  logger.info('getAppointmentById', { traceId, args })
  const appointment = callGetAppointmentByIdAPI(args, context)
  return appointment
}

export const createAppointmentAPI = (args: CreateAppointmentArgs, context: ServerContext): CreateAppointmentReturn => {
  const traceId = context.traceId
  logger.info('createAppointmentByAPI', { traceId, args })
  const appointment = callCreateAppointmentByAPI(args, context)
  return appointment
}

const appointmentServices = {
  updateAppointmentById,
  getAppointmentById,
  getAppointments,
  createAppointmentAPI,
}

export default appointmentServices
