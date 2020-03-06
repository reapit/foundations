import appointmentServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'
import {
  GetAppointmentByIdArgs,
  CreateAppointmentArgs,
  GetAppointmentsArgs,
  UpdateAppointmentArgs,
  QueryGetAppointmentByIdReturn,
  QueryGetAppointmentsReturn,
  MutationCreateAppointmentReturn,
  MutationUpdateAppointmentReturn,
} from './appointments'

export const queryGetAppointmentById = (
  _: any,
  args: GetAppointmentByIdArgs,
  context: ServerContext,
): QueryGetAppointmentByIdReturn => {
  const traceId = context.traceId
  logger.info('queryAppointment', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return appointmentServices.getAppointmentById(args, context)
}

export const queryGetAppointments = (
  _: any,
  args: GetAppointmentsArgs,
  context: ServerContext,
): QueryGetAppointmentsReturn => {
  const traceId = context.traceId
  logger.info('appointments', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return appointmentServices.getAppointments(args, context)
}

export const mutationCreateAppointment = (
  _: any,
  args: CreateAppointmentArgs,
  context: ServerContext,
): MutationCreateAppointmentReturn => {
  const traceId = context.traceId
  logger.info('createAppointment', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return appointmentServices.createAppointment(args, context)
}

export const mutationUpdateAppointment = (
  _: any,
  args: UpdateAppointmentArgs,
  context: ServerContext,
): MutationUpdateAppointmentReturn => {
  const traceId = context.traceId
  logger.info('updateAppointment', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return appointmentServices.updateAppointment(args, context)
}

export default {
  Query: {
    GetAppointmentById: queryGetAppointmentById,
    GetAppointments: queryGetAppointments,
  },
  Mutation: {
    CreateAppointment: mutationCreateAppointment,
    UpdateAppointment: mutationUpdateAppointment,
  },
}
