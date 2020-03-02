import { fetcher, setQueryParams } from '@reapit/elements'
import logger from '../../logger'
import { ServerContext } from '../../app'
import errors from '../../errors'
import { API_VERSION } from '../../constants/api'

import {
  GetAppointmentByIdArgs,
  GetAppointmentsArgs,
  UpdateAppointmentArgs,
  CreateAppointmentArgs,
  GetAppointmentByIdReturn,
  GetAppointmentsReturn,
  CreateAppointmentReturn,
  UpdateAppointmentReturn,
} from './types'

export const URLS = {
  appointments: '/appointments',
}

export const callGetAppointmentsAPI = async (
  args: GetAppointmentsArgs,
  context: ServerContext,
): GetAppointmentsReturn => {
  const traceId = context.traceId
  try {
    logger.info('callGetAppointmentsAPI', { traceId, args })

    const createResponse = await fetcher({
      url: `${URLS.appointments}/?${setQueryParams(args)}`,
      api: process.env['PLATFORM_API_BASE_URL'],
      method: 'GET',
      headers: {
        authorization: context.authorization,
        'Content-Type': 'application/json',
        'api-version': API_VERSION,
      },
      body: {},
    })
    return createResponse
  } catch (error) {
    logger.error('callGetAppointmentsAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}
export const callGetAppointmentByIdAPI = async (
  args: GetAppointmentByIdArgs,
  context: ServerContext,
): GetAppointmentByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetAppointmentByIdAPI', { args, traceId })
  try {
    const response = await fetcher({
      url: `${URLS.appointments}/${args.id}`,
      api: process.env['PLATFORM_API_BASE_URL'],
      method: 'GET',
      headers: {
        authorization: context.authorization,
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

export const callUpdateAppointmentByIdAPI = async (
  args: UpdateAppointmentArgs,
  context: ServerContext,
): UpdateAppointmentReturn => {
  const traceId = context.traceId
  logger.info('callUpdateAppointmentByIdAPI', { args, traceId })
  try {
    await fetcher({
      url: `${URLS.appointments}/${args.id}`,
      api: process.env['PLATFORM_API_BASE_URL'],
      body: args,
      method: 'PATCH',
      headers: {
        authorization: context.authorization,
        'Content-Type': 'application/json',
        'api-version': API_VERSION,
        'If-Match': args._eTag,
      },
    })
    const response = await fetcher({
      url: `${URLS.appointments}/${args.id}`,
      api: process.env['PLATFORM_API_BASE_URL'],
      method: 'GET',
      headers: {
        authorization: context.authorization,
        'Content-Type': 'application/json',
        'api-version': API_VERSION,
      },
    })
    return response
  } catch (error) {
    logger.error('callUpdateAppointmentByIdAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callCreateAppointmentByAPI = async (
  args: CreateAppointmentArgs,
  context: ServerContext,
): CreateAppointmentReturn => {
  const traceId = context.traceId
  logger.info('callCreateAppointmentByAPI', { args, traceId })
  try {
    await fetcher({
      url: `${URLS.appointments}`,
      api: process.env['PLATFORM_API_BASE_URL'],
      method: 'POST',
      headers: {
        authorization: context.authorization,
        'Content-Type': 'application/json',
        'api-version': API_VERSION,
      },
      body: args,
    })
    return true
  } catch (error) {
    logger.error('callCreateAppointmentByAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}
