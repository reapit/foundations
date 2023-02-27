import qs from 'query-string'
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
  try {
    const { id, ...rest } = args
    const params = qs.stringify(rest as Record<string, string>)
    const response = await createPlatformAxiosInstance().get<GetAppointmentByIdReturn>(
      `${URLS.appointments}/${id}?${params}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetAppointmentByIdAPI' })
    return handleErrorResult
  }
}

export const callGetAppointmentsAPI = async (
  args: GetAppointmentsArgs,
  context: ServerContext,
): GetAppointmentsReturn => {
  const traceId = context.traceId
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetAppointmentsReturn>(`${URLS.appointments}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetAppointmentsAPI' })
    return handleErrorResult
  }
}

export const callCreateAppointmentAPI = async (
  args: CreateAppointmentArgs,
  context: ServerContext,
): CreateAppointmentReturn => {
  const traceId = context.traceId
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
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateAppointmentAPI' })
    return handleErrorResult
  }
}

export const callUpdateAppointmentAPI = async (
  args: UpdateAppointmentArgs,
  context: ServerContext,
): UpdateAppointmentReturn => {
  const traceId = context.traceId
  try {
    const { _eTag, ...payload } = args
    const appointment = await callGetAppointmentByIdAPI({ id: args.id }, context)
    const eTag = appointment?._eTag ?? _eTag
    const updateResponse = await createPlatformAxiosInstance().patch<UpdateAppointmentReturn>(
      `${URLS.appointments}/${args.id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': eTag,
        },
      },
    )
    if (updateResponse) {
      return callGetAppointmentByIdAPI({ id: args.id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callUpdateAppointmentAPI' })
    return handleErrorResult
  }
}
