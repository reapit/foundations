import appointmentServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../utils'
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
import { AppointmentModel } from '@reapit/foundations-ts-definitions'

export const queryGetAppointmentById = (
  _: any,
  args: GetAppointmentByIdArgs,
  context: ServerContext,
): QueryGetAppointmentByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetAppointmentById', { traceId, args })
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
  logger.info('queryGetAppointments', { traceId, args })
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
  logger.info('mutationCreateAppointment', { traceId, args })
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
  logger.info('mutationUpdateAppointment', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return appointmentServices.updateAppointment(args, context)
}

export const queryConfiguration = (appointment: AppointmentModel, _, context: ServerContext) => {
  return context.dataLoader.configurationLoader.load(appointment.typeId)
}

export const queryProperty = (appointment: AppointmentModel, _, context: ServerContext) => {
  return context.dataLoader.propertyLoader.load(appointment.propertyId)
}

export const queryNegotiators = (appointment: AppointmentModel, _, context: ServerContext) => {
  return context.dataLoader.negotiatorLoader.loadMany(appointment.negotiatorIds)
}

export const queryOffices = (appointment: AppointmentModel, _, context: ServerContext) => {
  return context.dataLoader.officeLoader.loadMany(appointment.officeIds)
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
  AppointmentModel: {
    property: queryProperty,
    appointmentType: queryConfiguration,
    offices: queryOffices,
    negotiators: queryNegotiators,
  },
}
