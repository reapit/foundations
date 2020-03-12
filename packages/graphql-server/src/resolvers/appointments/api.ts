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
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'
import { getIdFromCreateHeaders } from '../../utils/get-id-from-create-headers'

export const callGetAppointmentByIdAPI = async (
  args: GetAppointmentByIdArgs,
  context: ServerContext,
): GetAppointmentByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetAppointmentByIdAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().get<GetAppointmentByIdReturn>(
      `${URLS.appointments}/${args.id}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    return handleError({ error, traceId, caller: 'callGetAppointmentByIdAPI' })
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
    const response = await createPlatformAxiosInstance().get<GetAppointmentsReturn>(`${URLS.appointments}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    return handleError({ error, traceId, caller: 'callGetAppointmentsAPI' })
  }
}

export const callCreateAppointmentAPI = async (
  args: CreateAppointmentArgs,
  context: ServerContext,
): CreateAppointmentReturn => {
  const traceId = context.traceId
  logger.info('callCreateAppointmentAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().post<CreateAppointmentReturn>(URLS.appointments, args, {
      headers: {
        Authorization: context.authorization,
      },
    })
    const id = getIdFromCreateHeaders({ headers: response.headers })
    if (id) {
      return callGetAppointmentByIdAPI({ id }, context)
    }
    return null
  } catch (error) {
    return handleError({ error, traceId, caller: 'callCreateAppointmentAPI' })
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
    const updateResponse = await createPlatformAxiosInstance().patch<UpdateAppointmentReturn>(
      `${URLS.appointments}/${args.id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse?.data) {
      return callGetAppointmentByIdAPI({ id: args.id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    return handleError({ error, traceId, caller: 'callUpdateAppointmentAPI' })
  }
}
