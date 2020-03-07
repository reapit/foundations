import { fetcher } from '@reapit/elements'
import qs from 'query-string'
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
import errors from '../../errors'
import { API_VERSION, URLS } from '../../constants/api'

export const callGetAppointmentByIdAPI = async (
  args: GetAppointmentByIdArgs,
  context: ServerContext,
): GetAppointmentByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetAppointmentByIdAPI', { traceId, args })
  try {
    const response = await fetcher({
      url: `${URLS.appointments}/${args.id}`,
      api: process.env.PLATFORM_API_BASE_URL,
      method: 'GET',
      headers: {
        Authorization: context.authorization,
        'Content-Type': 'application/json',
        'api-version': API_VERSION,
      },
    })
    return response
  } catch (error) {
    logger.error('callGetAppointmentByIdAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callGetAppointmentsAPI = async (
  args: GetAppointmentsArgs,
  context: ServerContext,
): GetAppointmentsReturn => {
  const traceId = context.traceId
  logger.info('callGetAppointmentsAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = fetcher({
      url: `${URLS.appointments}/?${params}`,
      api: process.env.PLATFORM_API_BASE_URL,
      method: 'GET',
      headers: {
        Authorization: context.authorization,
        'Content-Type': 'application/json',
        'api-version': API_VERSION,
      },
    })
    return response
  } catch (error) {
    logger.error('callGetAppointmentsAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callCreateAppointmentAPI = async (
  args: CreateAppointmentArgs,
  context: ServerContext,
): CreateAppointmentReturn => {
  const traceId = context.traceId
  logger.info('callCreateAppointmentAPI', { traceId, args })
  try {
    const response = await fetcher({
      url: URLS.appointments,
      api: process.env.PLATFORM_API_BASE_URL,
      method: 'POST',
      headers: {
        Authorization: context.authorization,
        'Content-Type': 'application/json',
        'api-version': API_VERSION,
      },
      body: args,
    })
    return response
  } catch (error) {
    logger.error('callCreateAppointmentAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callUpdateAppointmentAPI = async (
  args: UpdateAppointmentArgs,
  context: ServerContext,
): UpdateAppointmentReturn => {
  const traceId = context.traceId
  logger.info('callUpdateAppointmentAPI', { traceId, args })
  try {
    const { _eTag, ...payload } = args
    const response = await fetcher({
      url: `${URLS.appointments}/${args.id}`,
      api: process.env.PLATFORM_API_BASE_URL,
      method: 'PATCH',
      headers: {
        Authorization: context.authorization,
        'Content-Type': 'application/json',
        'api-version': API_VERSION,
        'If-Match': _eTag,
      },
      body: payload,
    })
    return response
  } catch (error) {
    logger.error('callUpdateAppointmentAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}
